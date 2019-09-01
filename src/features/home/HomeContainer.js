import React, { useState } from 'react';
import { PageHeader } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from 'store/ducks/auth/selectors';
import { getLoansByUserId } from 'services/loanService';
import { applyApiService } from 'services/apiService';
import LayoutComponent from 'features/layout/LayoutComponent';
import LoanTableContainer from 'features/loan/LoanTableContainer';

const HomeContainer = props => {
  const userId = useSelector(getUserId);
  const [loans, setLoans] = useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchLoans() {
      const response = await applyApiService(
        dispatch,
        getLoansByUserId,
        userId
      );
      setLoans(response.data);
    }
    fetchLoans();
  }, [userId, dispatch]);
  return (
    <LayoutComponent>
      <PageHeader title="Your Loans" />
      {loans && <LoanTableContainer initialValues={loans} />}
    </LayoutComponent>
  );
};

export default HomeContainer;
