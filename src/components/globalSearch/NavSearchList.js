import React from 'react';
import styled from "styled-components/native";
import { connect } from 'react-redux';
import VideoList from '../common/VideoList';
import { GlobalText } from '../../styles/StyledComponents';

const NavSearchList = ({ dataItems, searchQuery }) => {
  
  const filterData = (item) => {
    return item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.description?.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filteredItems = searchQuery ? dataItems.filter(filterData) : [];

  const renderVideoItem = (item) => {
    return (
      <>
        <Thumbnail layout={layout} source={{ uri: video.thumbnail }} />
        <Content>
          <ItemTitle numberOfLines={1}>{video.title}</ItemTitle>
          <Description numberOfLines={1}>{video.description}</Description>
          {layout !== 'horizontal' && <Metadata>{video.metadata}</Metadata>}
        </Content>
        {layout !== 'horizontal' && <ChevronIcon name="chevron-forward-outline" />}
      </>
    );
  };

  return (
    <NavSearchListContainer>
      {searchQuery === '' && (
        <EmptySearchMessage>Start typing to search...</EmptySearchMessage>
      )}
      {searchQuery !== '' && filteredItems.length === 0 && (
        <EmptySearchMessage>No search results match this query...</EmptySearchMessage>
      )}
      <VideoList 
        items={filteredItems} 
        layout='vertical'
        renderFunction={renderVideoItem}
      /> 
    </NavSearchListContainer>
  );
};

const mapStateToProps = (state) => ({
  dataItems: state.dataItems,
  searchQuery: state.searchQuery,
});

export default connect(mapStateToProps)(NavSearchList);

const NavSearchListContainer = styled.View`
  flex: 1;
`;

const EmptySearchMessage = styled(GlobalText)`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin: 20px;
`;
