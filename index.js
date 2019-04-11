import { Navigation } from 'react-native-navigation';
import registerComponents from './src/screens';


registerComponents(Navigation);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'InitializingScreen',
      },
    },
  });
});
