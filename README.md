# Розробка веб-застосунку для підтримки діяльності будівельної компанії
Кваліфікаційна робота на підтвердження ступеня фахового молодшого
бакалавра ([ВСП «ППФК НТУ «ХПІ»](http://polytechnic.poltava.ua)).
Керівник роботи – **Бавбич Олександр Вікторович**.
## Розробка веб-застосунку для підтримки діяльності будівельної компанії
Розроблений програмний продукт являє собою веб-застосунок, який надає функціональність, типову для систем подібного призначення – облік укладених угод, клієнтів та постачальників, будматеріалів, об’єктів тощо, формування типових документів та звітів, експорт/імпорт даних тощо. Слід подбати про використання актуальних технологій та адаптивність інтерфейсу, для хостингу використати Microsoft Azure (або AWS чи GCP).
## Як завантажити проект
1. Перейти до вітки `main`.
2. Завантажити архів з проектом та розархівовуєте проект або задопомогою команди `git clone https://github.com/batl64/-website--construction-company.git --branch main [назва яку ви дасте репозиторію де буде зберігатися проект]` клонуєте репозиторій.
3. Задопомогою консолі введіль команди `npm i` завантажити бібліотеки в папках `admin`, `backend`, `public`.
4. Запустіть проект виконавши в папках `admin`, `backend`, `public` консольну команду `npm run build`.
## Структура проекту
Папки проекту
* `admin` - пака в якій знаходиться код якій приводить в дію адміністративну частину проекту.
   * `src` - папка в якій знаходять основні елементи коду.
        * `components`
        * `pages`
        * `redux`
        * `servises` 
* `public` - пака в якій знаходиться код якій приводить в дію публічну частину проекту.
   * `src` - папка в якій знаходять основні елементи коду.
        * `components`
        * `pages`
        * `redux`
        * `servises` 
* `backend` - пака в якій знаходиться код якій приводить в дію API проекту.
   * `src` - папка в якій знаходять основні елементи коду.
        * `const`
        * `controler`
        * `routers` 
* `db` - пака в якій знаходиться дані про базу даних.
## Посилання на веб-сайти
http://ec2-35-181-61-214.eu-west-3.compute.amazonaws.com:8080/ - admin
http://ec2-35-181-61-214.eu-west-3.compute.amazonaws.com:8081/ - public

## Мови та інструменти
<p align="left"> <a href="https://babeljs.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/babeljs/babeljs-icon.svg" alt="babel" width="40" height="40"/> </a> <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> <a href="https://webpack.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg" alt="webpack" width="40" height="40"/> </a> </p>
