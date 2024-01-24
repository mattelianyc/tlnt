import { Share } from 'react-native';

const useShareContent = () => {
  const shareContent = async ({ title, message, url }) => {
    try {
      let shareMessage = '';

      if (title) {
        shareMessage += `${title}\n`;
      }
      if (message) {
        shareMessage += `${message}\n`;
      }
      if (url) {
        shareMessage += `Check this out: ${url}`;
      }

      const result = await Share.share({
        message: shareMessage
      });

      if (result.action === Share.sharedAction) {
        // Handle the share action result if needed
      }
    } catch (error) {
      console.error('Error while sharing:', error.message);
    }
  };

  return shareContent;
};

export default useShareContent;
