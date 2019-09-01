import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { updateItemById } from 'utils/immutability';
import { repay, submitLoan } from 'services/loanService';
import { applyApiService } from 'services/apiService';
import { tableConfig, LoanStatus } from 'const';
import { FORM_ERROR } from 'final-form';
import { TableStyled } from './LoanStyled';
import LoanCreateComponent from './LoanCreateComponent';
import { formatCurrency } from 'utils/strings';

const LoanTableContainer = ({ initialValues }) => {
  const [editingLoan, setEditingLoan] = useState(null);
  const [loans, setLoans] = useState(initialValues);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(
    tableConfig.PAGINATION.defaultPageSize
  );
  const [currentPage, setCurrentPage] = useState(1);
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
          <>
            <Button
              type="link"
              onClick={() => replayLoan(record)}
              disabled={
                !record.repaymentAmount || record.status === 'processing'
              }
            >
              Repay
            </Button>
          </>
        );
      }
    }
  ];
  const handleConfirmEditLoan = async loan => {
    try {
      const currentLength = loans.length;
      await applyApiService(dispatch, submitLoan, loan);
      setCurrentPage(parseInt(currentLength + 1 / pageSize) + 1);
      setEditingLoan(null);
    } catch (error) {
      return { [FORM_ERROR]: 'Submit Loan error' };
    }
  };
  const handleCancelEditLoan = () => {
    setEditingLoan(null);
  };
  const handleAddLoan = () => {
    setEditingLoan({ activeStatus: 'Active', role: 'Admin' });
  };

  return (
    <>
      {editingLoan && (
        <LoanCreateComponent
          handleSubmit={handleConfirmEditLoan}
          handleCancel={handleCancelEditLoan}
          editingLoan={editingLoan}
        />
      )}
      <Button type="secondary" icon="file-add" onClick={handleAddLoan}>
        Create Loan
      </Button>
      <TableStyled
        columns={columns}
        dataSource={loans}
        pagination={{
          ...tableConfig.PAGINATION,
          current: currentPage,
          onChange: page => setCurrentPage(page),
          onShowSizeChange: (current, size) => setPageSize(size)
        }}
        currentPage={currentPage}
        rowKey="id"
      />
    </>
  );
};

export default LoanTableContainer;
