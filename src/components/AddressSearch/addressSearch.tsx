import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import type { AddressData, SelectedAddress } from './address';

interface Props {
    onComplete: (data: SelectedAddress) => void;
    onClose: () => void;
}

const AddressSearch: React.FC<Props> = ({ onComplete, onClose }) => {
    const handleComplete = (data: AddressData) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        onComplete({
            address: fullAddress,
            postCode: data.zonecode
        });
        onClose();
    };

    return (
        <div style={{ width: '100%', height: '450px' }}>
            <DaumPostcode
                onComplete={handleComplete}
                className="postcode-search"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default AddressSearch;