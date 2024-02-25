import React from 'react';
import styled from "styled-components/native";
import { useSelector } from 'react-redux'; // Import useSelector hook
import VideoList from './../common/VideoList'; // Import the VideoList component
import { GlobalText } from '../../styles/StyledComponents';

const GlobalSearchList = () => {
  // Use useSelector hook to access the Redux state
  const videos = useSelector((state) => state.videos.videos);
  const searchQuery = useSelector((state) => state.search.searchQuery);

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

export default GlobalSearchList;

const GlobalSearchListContainer = styled.View`
  flex: 1;
`;

const EmptySearchMessage = styled(GlobalText)`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin: 20px;
`;
