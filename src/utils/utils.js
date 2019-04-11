import Icon from 'react-native-vector-icons/FontAwesome';

export const loadIcons = Promise.all([
  Icon.getImageSource('user', 25),
  Icon.getImageSource('user', 25),
]).then((sources) => {
  [icons.backButton, icons.nextButton] = sources; // do whatever necessary thing you need
  return true;
}).catch(error => error);
