# pdr(프로덕션 리포트 앱)
영화 제작팀에서 프로덕션 리포트를 작성할 때 참고할 시간 정보를 메모할 수 있는 어플리케이션.
크롬브라우저와 안드로이드에서 실행 가능.


<img src="https://github.com/hoisharka/pdr/blob/master/pdr.gif?raw=true" width="250" height="450" />

## 기능
- 씬 단위로 시간 메모를 관리
- 씬 단위 내에서 그룹을 나누어 메모할 수 있음
- 메모의 추가, 수정, 삭제 기능이 있으며 메모를 추가하면 추가한 시점의 시간이 기본값으로 기록됨
- csv파일 다운로드 기능으로 씬 단위의 메모를 다운 받을 수 있음
- csv파일 다운로드 경로
  - 크롬: 기본 다운로드 경로
  - 안드로이드앱: sd카드의 Download 폴더에 파일이 생성됨
- 템플릿을 설정해서 씬 단위의 메모를 생성할 때 기본값으로 메모를 추가할 수 있음

## 설치
```bash
git clone git@github.com:hoisharka/pdr.git
cd pdr
npm install
```

## 실행
크롬 브라우저로 실행
```bash
ionic serve
```
안드로이드 기기에서 앱으로 실행
```bash
ionic run android --device
```
