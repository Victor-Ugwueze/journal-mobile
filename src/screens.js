import ApolloClient from 'apollo-client';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import apolloProvide from './hoc/apolloProvider';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Initializing from './pages/Initializing';
import Home from './pages/home';
import SideMenu from './components/SideBar';
import CreateDiary from './pages/CreateDiary';


const link = token  => ApolloLink.from([
  new HttpLink({
    uri: Platform.OS === 'ios' 
    ? 'http://127.0.0.1:4000/graphql' 
    : 'http://10.0.2.2:4000/graphql',
    credentials: 'same-origin',
    headers: {
      authorization: token
    },
  })
]);

export default async function registerComponents(Navigation) {
  const token = await    await AsyncStorage.getItem('token');
  const client = new ApolloClient({
    link: link(token),
    cache: new InMemoryCache(),
  });

  Navigation.registerComponent('InitializingScreen', () => apolloProvide(Initializing, client));
  Navigation.registerComponent('LoginScreen', () => apolloProvide(Login, client));
  Navigation.registerComponent('SignUpScreen', () => apolloProvide(SignUp, client));
  Navigation.registerComponent('HomeScreen', () => apolloProvide(Home, client));
  Navigation.registerComponent('CreateDiaryScreen', () => apolloProvide(CreateDiary, client));
  Navigation.registerComponent('navigation.Drawer', () => SideMenu);
}
