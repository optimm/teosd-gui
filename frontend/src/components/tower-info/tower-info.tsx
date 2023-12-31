import { useEffect, useState } from 'react';
import { AddressTable, ItemSingle, TowerInfoContainer } from './styles';
import { CardError, CopyTextComponent, DataTable, DataTableData, PageCardLoader } from '..';
import { TowerInfoDto } from '@common/dto';
import { ApiService } from '@common/service/api.service';
import { ApiUtil } from '@common/utils';
import Icons from '@assets/icons';

const TowerInfoComponent: React.FC = () => {
  const [towerInfo, setTowerInfo] = useState<TowerInfoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getInfo() {
      try {
        const { data } = await ApiService.getTowerInfo();
        setTowerInfo(data.towerInfo);
      } catch (error) {
        const errorMessage = ApiUtil.getErrorMsg(error);
        setError(errorMessage);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
    getInfo();
  }, []);

  return (
    <>
      {loading ? (
        <PageCardLoader />
      ) : (
        <>
          {error ? (
            <CardError error={error} />
          ) : (
            <>
              <TowerInfoContainer>
                <ItemSingle>
                  <div className='item-title'>Tower ID</div>
                  <div className='item-right'>
                    <div className='item-value'>{towerInfo?.tower_id}</div>
                    <CopyTextComponent text={towerInfo?.tower_id} />
                  </div>
                </ItemSingle>
                <ItemSingle>
                  <div className='item-title'>Registered users</div>
                  <div className='item-right'>
                    <div className='item-value'>{towerInfo?.n_registered_users}</div>
                  </div>
                </ItemSingle>
                <ItemSingle>
                  <div className='item-title'>Watcher appointments</div>
                  <div className='item-right'>
                    <div className='item-value'>{towerInfo?.n_watcher_appointments}</div>
                  </div>
                </ItemSingle>
                <ItemSingle>
                  <div className='item-title'>Responder trackers</div>
                  <div className='item-right'>
                    <div className='item-value'>{towerInfo?.n_responder_trackers}</div>
                  </div>
                </ItemSingle>
                <ItemSingle>
                  <div className='item-title'>Bitcoind reachable</div>
                  <div className='item-right'>
                    <img
                      src={towerInfo?.bitcoind_reachable ? Icons.TickIcon : Icons.CrossIcon}
                      alt='bitcoind reachable'
                      className='bitcoin-reachable-icon'
                    />
                  </div>
                </ItemSingle>
              </TowerInfoContainer>
              <AddressTable>
                <DataTable>
                  <div className='data-table-title'>Addresses</div>
                  <div className='data-table-divider' />
                  <DataTableData columns={3}>
                    <div className='data-table-row'>
                      <div className='data-table-column'>
                        <div className='data-table-column-head'>Type</div>
                      </div>
                      <div className='data-table-column'>
                        <div className='data-table-column-head'>Address</div>
                      </div>
                      <div className='data-table-column'>
                        <div className='data-table-column-head'>Port</div>
                      </div>
                    </div>
                    {towerInfo?.addresses?.map((item, index) => (
                      <div className='data-table-row' key={index}>
                        <div className='data-table-column'>
                          <div className='data-table-text'>{item.type}</div>
                        </div>
                        <div className='data-table-column'>
                          <div className='data-table-text'>{item.address}</div>
                        </div>
                        <div className='data-table-column'>
                          <div className='data-table-text'>{item.port}</div>
                        </div>
                      </div>
                    ))}
                  </DataTableData>
                </DataTable>
              </AddressTable>
            </>
          )}
        </>
      )}
    </>
  );
};

export default TowerInfoComponent;
