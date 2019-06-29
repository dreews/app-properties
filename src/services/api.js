import request from './request';

const host = 'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com';

export const allProperties = params => (
  request('GET', `${host}/sources/source-1.json`, params)
);

export default {};
