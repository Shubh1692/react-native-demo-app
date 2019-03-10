
import ConfirmOrder from './app/screens/ConfirmOrder';
import SuccessOrder from './app/screens/SuccessOrder';
import {
  createStackNavigator, createAppContainer
} from 'react-navigation';

const RootStack = createStackNavigator({
  ConfirmOrder: { screen: ConfirmOrder },
  SuccessOrder: { screen: SuccessOrder },
}, {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      initialRouteName: 'ConfirmOrder',
    }
  });
const App = createAppContainer(RootStack);
export default App;