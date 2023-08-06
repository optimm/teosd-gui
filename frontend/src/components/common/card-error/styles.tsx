import styled from '@emotion/styled';

export const CardErrorContainer = styled('div')({
  width: '100%',
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '30px',

  ['& .card-error-icon']: {
    height: '80px'
  },
  ['& .card-error-text']: {
    color: 'red',
    fontSize: '20px'
  }
});
