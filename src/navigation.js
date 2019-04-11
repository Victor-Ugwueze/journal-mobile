import { Navigation } from 'react-native-navigation';

export const redirectToAuth = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          component: {
            name: 'LoginScreen',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Sign In',
                icon: require('./img/login.png'),
              },
            },
          },
        },
        {
          component: {
            name: 'SignUpScreen',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Sign Up',
                icon: require('./img/sign-up.png'),
              },
            },
          },
        },
      ],
    },
  }
});


export const redirectHome = () => Navigation.setRoot({
  root: {
    sideMenu: {
        id: "sideMenu",
        left: {
            component: {
                id: "Drawer",
                name: "navigation.Drawer",
                passProps: {
                  text: 'This is a left side menu screen'
                }
            }
        },
        center: {
            stack: {
              id: "AppRoot",
              children: [
                  {
                      component: {
                          id: "App",
                          name: "HomeScreen"
                      }
                  }
              ]
            }
        }
    }
}
});
