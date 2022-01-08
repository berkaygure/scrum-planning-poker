import { Schema, model, PassportLocalDocument } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Session = new Schema({
  refreshToken: {
    type: String,
    default: '',
  },
});

export interface User extends PassportLocalDocument {
  username: string;
  authStrategy: string;
  refreshToken: {
    type: string;
  };
}

const schema = new Schema<User>({
  username: String,
  authStrategy: {
    type: String,
    default: 'local',
  },
  refreshToken: {
    type: [Session],
  },
});

//Remove refreshToken from the response
schema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.refreshToken;
    return ret;
  },
});

schema.plugin(passportLocalMongoose);

export default model('User', schema);
