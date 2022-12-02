import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import i18n from 'i18n'
import indexRouter from './routes/index'

const app = express();

i18n.configure({
  defaultLocale: 'en',
  locales: ['en', 'id'],
  directory: path.join(__dirname, 'libs/lang'),
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
  api: {
    __: 't', // now req.__ becomes req.t
    __n: 'tn', // and req.__n can be called as req.tn
  },
})
app.use(i18n.init)

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: 'not found' })
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err)

  res.status(500).render('error', { message: err?.message, error: JSON.stringify(err, null, 2) });
});

export default app;
