import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Home from "./components/Screens/Home";
import AddCategory from "./components/Screens/AddCategory";
import AddProduct from "./components/Screens/AddProduct";
import Category from "./components/Screens/Category";
import Products from "./components/Screens/Products";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />
      <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
      <Stack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
      <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
      <Stack.Screen name="Registration" component={Register} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator();