// TransactionList.js
import React from 'react';
import styled from 'styled-components/native';
import { GlobalText } from '../../styles/StyledComponents';
import { FlatList } from 'react-native';

const TransactionList = ({ transactions }) => {

  const renderTransaction = ({ item }) => (
    <TransactionRow>
      <TransactionDetails>
        <TransactionDescription>{item.description}</TransactionDescription>
        <TransactionAmount amount={item.amount}>
          {item.amount >= 0 ? `+${item.amount}` : item.amount} USD
        </TransactionAmount>
      </TransactionDetails>
      <TransactionDate>{item.date}</TransactionDate>
    </TransactionRow>
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderTransaction}
      keyExtractor={item => item._id}
    />
  );
};

export default TransactionList;

const TransactionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

const TransactionDetails = styled.View`
  flex: 1;
`;

const TransactionDescription = styled(GlobalText)`
  font-size: 16px;
`;

const TransactionAmount = styled(GlobalText)`
  font-size: 16px;
  color: ${props => props.amount >= 0 ? 'green' : 'red'};
`;

const TransactionDate = styled(GlobalText)`
  font-size: 14px;
  margin-left: 10px;
`;

