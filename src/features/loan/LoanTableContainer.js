import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from 'store/ducks/auth/selectors';
import { updateItemById, addNewItem } from 'utils/immutability';
import { repay, submitLoan } from 'services/loanService';
import { applyApiService } from 'services/apiService';
import { tableConfig, LoanStatus } from 'const';
import { FORM_ERROR } from 'final-form';
import { TableStyled } from './LoanStyled';
import LoanCreateComponent from './LoanCreateComponent';
import { formatCurrency } from 'utils/strings';

const LoanTableContainer = ({ initialValues }) => {
  const userId = useSelector(getUserId);
  const [creatingLoan, setCreatingLoan] = useState(null);
  const [loans, setLoans] = useState(initialValues);
  const dispatch = useDispatch();
  const replayLoan = async loan => {
    try {
      const newLoan = await applyApiService(dispatch, repay, loan);
      setLoans(updateItemById(loans, newLoan));
      message.info(`${loan.title}: repaid successfully`, 5);
    } catch (error) {
      message.error(`${loan.title}: repaid error`, 5);
    }
  };
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title'
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      render: (text, record) => formatCurrency(text)
    },
    {
      title: 'Repayment Amount',
      dataIndex: 'repaymentAmount',
      render: (text, record) => formatCurrency(text)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) =>
        LoanStatus.find(item => item.id === text).displayName
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Button
            type="link"
            onClick={async () => await replayLoan(record)}
            disabled={!record.repaymentAmount || record.status === 'processing'}
          >
            Repay
          </Button>
        );
      }
    }
  ];
  const handleConfirmEditLoan = async loan => {
    try {
      loan.userId = userId;
      const response = await applyApiService(dispatch, submitLoan, loan);
      setLoans(addNewItem(loans, [response.data]));
      setCreatingLoan(null);
    } catch (error) {
      return { [FORM_ERROR]: 'Submit Loan error' };
    }
  };
  const handleCancelEditLoan = () => {
    setCreatingLoan(null);
  };
  const handleAddLoan = () => {
    setCreatingLoan({ title: '', amount: 0 });
  };

  return (
    <>
      {creatingLoan && (
        <LoanCreateComponent
          handleSubmit={handleConfirmEditLoan}
          handleCancel={handleCancelEditLoan}
          editingLoan={creatingLoan}
        />
      )}
      <Button type="secondary" icon="file-add" onClick={handleAddLoan}>
        Create Loan
      </Button>
      <TableStyled
        columns={columns}
        dataSource={loans}
        pagination={{
          ...tableConfig.PAGINATION
        }}
        rowKey="id"
      />
    </>
  );
};

export default LoanTableContainer;
