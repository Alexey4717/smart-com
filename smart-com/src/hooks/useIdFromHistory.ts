import { useHistory } from 'react-router-dom';

const useIdFromHistory = () => {
  const urlLevelList = useHistory().location.pathname.split('/');
  const uriId = urlLevelList[urlLevelList.length - 1];
  const isUriId = Boolean(uriId) && uriId !== 'dialogs';

  return { isUriId, uriId };
};

export default useIdFromHistory;