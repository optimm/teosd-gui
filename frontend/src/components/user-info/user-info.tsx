import { useState } from 'react';
import {
  CardError,
  CopyTextComponent,
  DataTable,
  DataTableData,
  PageCardLoader,
  StyledButton,
  StyledTextInput
} from '..';
import { NoSearchState, SearchSection, UserDataContainer, UserInfoContainer } from './styles';
import { UserData } from '@common/dto';
import Icons from '@assets/icons';
import { ApiService } from '@common/service/api.service';
import { ApiUtil } from '@common/utils';
import { ItemSingle } from '@components/tower-info/styles';

const UserInfoComponent: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetUserInfo = async () => {
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const { data } = await ApiService.getUserInfo(userId!);
      setUserData(data.userData);
    } catch (error) {
      const errorMessage = ApiUtil.getErrorMsg(error);
      setError(errorMessage);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <UserInfoContainer>
      <SearchSection>
        <div className='search-input'>
          <StyledTextInput
            variant='filled'
            fullWidth
            placeholder='Enter User Id'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <StyledButton
          variant='contained'
          disabled={loading || !userId || userId?.trim() == ''}
          onClick={handleGetUserInfo}
        >
          Get User Info
        </StyledButton>
      </SearchSection>
      {loading ? (
        <PageCardLoader />
      ) : (
        <>
          {error ? (
            <CardError error={error} />
          ) : (
            <>
              {userData ? (
                <UserDataContainer>
                  <div className='user-data'>
                    <ItemSingle>
                      <div className='item-title'>Available Slots</div>
                      <div className='item-right'>
                        <div className='item-value'>{userData.available_slots}</div>
                      </div>
                    </ItemSingle>
                    <ItemSingle>
                      <div className='item-title'>Subscription Expiry</div>
                      <div className='item-right'>
                        <div className='item-value'>{userData.subscription_expiry}</div>
                      </div>
                    </ItemSingle>
                  </div>
                  <div className='appointment-table'>
                    <DataTable>
                      <div className='data-table-title'>Appointments</div>
                      <div className='data-table-divider' />
                      <DataTableData columns={1}>
                        <div className='data-table-row'>
                          <div className='data-table-serial-no'>
                            <div className='data-table-column-head'>Sr No.</div>
                          </div>
                          <div className='data-table-column'>
                            <div className='data-table-column-head'>Appointment Id</div>
                          </div>
                        </div>
                        {userData?.appointments?.map((item, index) => (
                          <div className='data-table-row' key={index}>
                            <div className='data-table-serial-no'>{index + 1}</div>
                            <div className='data-table-column'>
                              <div className='data-table-text'>{item}</div>
                              <CopyTextComponent text={item} />
                            </div>
                          </div>
                        ))}
                      </DataTableData>
                    </DataTable>
                  </div>
                </UserDataContainer>
              ) : (
                <NoSearchState>
                  <img src={Icons.PersonIcon} alt='user icon' />
                </NoSearchState>
              )}
            </>
          )}
        </>
      )}
    </UserInfoContainer>
  );
};

export default UserInfoComponent;