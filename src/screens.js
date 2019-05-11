import ApolloClient from 'apollo-boost';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Initializing from './pages/Initializing';
import Home from './pages/Home';
import SideMenu from './components/SideBar';
import CreateDiary from './pages/CreateDiary';
import apolloProvide from './hoc/apolloProvider';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

cache.writeData({
  data: {
    todos: 'Hello',
    visibilityFilter: 'SHOW_ALL',
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: false,
    },
  },
});


export default async function registerComponents(Navigation) {
  const token = await    await AsyncStorage.getItem('token');
  const client = new ApolloClient({
    uri: Platform.OS === 'ios' 
    ? 'http://127.0.0.1:4000/graphql' 
    : 'http://10.0.2.2:4000/graphql',
    cache,
    headers: {
      authorization: token
    },
    resolvers: {
    }
  });

  Navigation.registerComponent('InitializingScreen', () => apolloProvide(Initializing, client));
  Navigation.registerComponent('LoginScreen', () => apolloProvide(Login, client));
  Navigation.registerComponent('SignUpScreen', () => apolloProvide(SignUp, client));
  Navigation.registerComponent('HomeScreen', () => apolloProvide(Home, client));
  Navigation.registerComponent('CreateDiaryScreen', () => apolloProvide(CreateDiary, client));
  Navigation.registerComponent('navigation.Drawer', () => SideMenu);
}
