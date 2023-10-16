import { View, Text } from 'react-native';
import React from 'react';

const CreditNotes = () => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        No New Credit Notes !
      </Text>
    </View>
  );
};

export default CreditNotes;
