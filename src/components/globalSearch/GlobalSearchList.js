import React from 'react';
import styled from "styled-components/native";
import { connect } from 'react-redux';
import VideoList from './../common/VideoList'; // Import the VideoList component
import { GlobalText } from '../../styles/StyledComponents';

const GlobalSearchList = ({ videos, searchQuery }) => {
  const filteredVideos = searchQuery
  ? videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];
    
    return (
      <GlobalSearchListContainer>
      {searchQuery === '' && (
        <EmptySearchMessage>Start typing to search skaters, topics, and more...</EmptySearchMessage>
        )}
      {searchQuery !== '' && filteredVideos.length === 0 && (
        <EmptySearchMessage>No search results match this query...</EmptySearchMessage>
        )}
      <VideoList videos={filteredVideos} layout='vertical' />
    </GlobalSearchListContainer>
  );
};

const mapStateToProps = (state) => ({
  videos: state.videos,
  searchQuery: state.searchQuery,
});

export default connect(mapStateToProps)(GlobalSearchList);

const GlobalSearchListContainer = styled.View`
  flex: 1;
`;

const EmptySearchMessage = styled(GlobalText)`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin: 20px;
`;
