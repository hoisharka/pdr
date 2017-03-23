import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';

@Injectable()
export class TempleteService {
  private _db;
  private _templetes;

  initDB() {
    this._db = new PouchDB('templete', { adapter: 'websql' });
  }

  add(scene) {
    console.log('add', scene);
    this._db.post(scene).then(function () {
      console.log('add success');
    }).catch(function (err) {
      console.log(err);
    });
  }

  update(scene) {
    console.log('update', scene);
    let thisObj = this;
    this._db.get(scene._id).then(function(doc){
      scene._rev = doc._rev;
      thisObj._db.put(scene).then(function(){
        console.log('update success');
      }).catch(function (err) {
        console.log(err);
      });
    });
  }

  delete(scene) {
    console.log('delete', scene);
    let thisObj = this;
    this._db.get(scene._id).then(function(doc){
      scene._rev = doc._rev;
      thisObj._db.remove(scene).then(function(){
        console.log('delete success');
      }).catch(function (err) {
        console.log(err);
      });
    });
  }

  getAll() {

    if (!this._templetes) {
      return this._db.allDocs({ include_docs: true, descending: true})
        .then(docs => {

          this._templetes = docs.rows.map(row => {
            return row.doc;
          });

          // Listen for changes on the database.
          this._db.changes({ live: true, since: 'now', include_docs: true})
            .on('change', this.onDatabaseChange);
          console.log(this._templetes);
          return this._templetes;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._templetes);
    }
  }

  private onDatabaseChange = (change) => {
    var index = this._templetes.map(function(item){ return item._id }).indexOf(change.id);
    var templete = this._templetes[index];
    console.log('ids: ', this._templetes.map(function(item){ return item._id }));
    console.log('onDatabaseChange change: ', change);
    console.log('onDatabaseChange index: ', index);
    console.log('onDatabaseChange templete: ', this._templetes);
    console.log('onDatabaseChange templete: ', templete);
    if (change.deleted) {
      if (templete) {
        this._templetes.splice(index, 1); // delete
        location.reload();
      }
    } else {
      if (templete && templete._id === change.id) {
        console.log('onDatabaseChange update');
        this._templetes[index] = change.doc; // update
      } else {
        console.log('onDatabaseChange insert');
        this._templetes.unshift(change.doc) //insert
      }
    }

    console.log('onDatabaseChange after templete:', this._templetes);
  }
}
