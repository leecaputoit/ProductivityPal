import { StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Dashboard</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  