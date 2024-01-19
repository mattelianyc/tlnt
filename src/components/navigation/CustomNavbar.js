import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';
import { HeaderContainer, SearchBarContainer, SearchInput, TopNavLeft, TopNavMiddle, TopNavRight } from '../../styles/StyledComponents';

export default function CustomNavbar({ navigation, searchVisible, setSearchVisible }) {
  return (
    <HeaderContainer>

      <TopNavLeft>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </TopNavLeft>

      <TopNavMiddle>
        {!searchVisible && <Text style={{ color: 'black', fontSize: 24 }}>ollie</Text>}
        
        {searchVisible ? 
          (
            <SearchBarContainer>
              <SearchInput placeholder="Search..." />
            </SearchBarContainer>
          ) : null
        }
      </TopNavMiddle>
      
      <TopNavRight>
        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
          {searchVisible ? 
            <Ionicons name="close" size={24} color="black" /> : 
              <Ionicons name="search" size={24} color="black" />
          }
        </TouchableOpacity>
      </TopNavRight>

    </HeaderContainer>
  );
};
