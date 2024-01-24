import React, { useEffect, useState } from 'react';
import { Video } from 'expo-av';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const VideoContainer = styled.View`
  flex: 1;
  background-color: black;
`;

const StyledVideo = styled(Video)`
  flex: 1;
`;

const VideoPlayer = ({ videoUri }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <VideoContainer>
      {isLoading && (<ActivityIndicator size="large" color="#ff9999" />)}
      <StyledVideo
        source={videoUri}
        useNativeControls
        resizeMode="contain"
        isLooping
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
      />
    </VideoContainer>
  );
};

export default VideoPlayer;
