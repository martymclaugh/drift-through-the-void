function randomStringArray(num) {
  let text = "";
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=+{}[]\|:;'; //eslint-disable-line no-useless-escape

  for (var i = 0; i < num; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text.split('');
}

export default randomStringArray;
