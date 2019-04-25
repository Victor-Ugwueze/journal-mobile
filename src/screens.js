import ApolloClient from 'apollo-boost';
import { Platform } from 'react-native';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Initializing from './pages/Initializing';
import Home from './pages/Home';
import SideMenu from './components/SideBar';
import CreateDiary from './pages/CreateDiary';
import apolloProvide from './hoc/apolloProvider';


const client = new ApolloClient({
  uri: Platform.OS === 'ios' ? 'http://127.0.0.1:4000/graphql' : 'http://10.0.2.2:4000/graphql',
});


export default function registerComponents(Navigation) {
  Navigation.registerComponent('InitializingScreen', () => apolloProvide(Initializing, client));
  Navigation.registerComponent('LoginScreen', () => apolloProvide(Login, client));
  Navigation.registerComponent('SignUpScreen', () => apolloProvide(SignUp, client));
  Navigation.registerComponent('HomeScreen', () => apolloProvide(Home, client));
  Navigation.registerComponent('navigation.Drawer', () => SideMenu);
  Navigation.registerComponent('CreateDiaryScreen', () => CreateDiary);
}
