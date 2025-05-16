import React, {useState, useEffect} from 'react'
import CustomCustomerCard from '../CustomCard/CustomCustomerCard';
import profile_img from '../../../../images/Icon/profile-customer.png'

const dataArray = [
    {date: '14 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Jonh dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone', DocumentType: 'Motor', documentCode: '0123456789'},
    {date: '16 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Srave dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone', DocumentType: 'Motor', documentCode: '0123456789'},
    {date: '17 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Robert dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone', DocumentType: 'Motor', documentCode: '0123456789'},
    {date: '18 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Harry dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone', DocumentType: 'Motor', documentCode: '0123456789'},
    {date: '14 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Ammy dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone', DocumentType: 'Motor', documentCode: '0123456789'},
    {date: '11 June 2023', cardButton: 'IMPORTANT', imgData: profile_img, profileName: 'Lia dela Cruz', profileDescri: 'Customer since Feb 2023', proGender: 'Male', birtday: 'Jul 18', policy: 'Auto Comprehensive', proDele: 'Delete', proMess: 'Message', proMail: 'Mail', proPhone: 'Phone', DocumentType: 'Motor', documentCode: '0123456789'},
    // Add more items to the dataArray
  ];

const FilterPage = () => {

    return (
        <>
            <div className="LeadCard-Main-Page-Container">      
                <CustomCustomerCard dataArray={dataArray} itemsPerPage={2} />
            </div>
        </>
    )
}

export default FilterPage

