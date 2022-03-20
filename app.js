const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const indexRouter = require('./routes');
const userRouter = require('./routes/user')
dotenv.config();
const app = express();

app.set('port', process.env.PORT||8000);

app.use('/', express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extends:false}));


app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next)=>{
    const error = new Error('404 url 주소를 잘못 입력하셨습니다.');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.locals.message = error.message;
    res.locals.error = process.env.NODE_ENV !=='production'?error:{};
    res.status(error.status||500);
    res.send("Error");
});

app.listen(app.get('port'),  ()=>{
    console.log('[Server] open: '+app.get('port'));
})