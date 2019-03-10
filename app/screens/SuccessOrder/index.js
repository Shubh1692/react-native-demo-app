import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { CustomView, CustomContainer, CustomContent, CustomThumbnail, CustomText, CustomScrollView } from '../../components/CustomStyledComponent';


const { width } = Dimensions.get('window');
class SuccessOrder extends Component {
    static propTypes = {

    };
    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }





    render() {
        const { navigation } = this.props;
        const purchaseItems = navigation.getParam('purchaseItems', {});
        const totalAmount = navigation.getParam('totalAmount', {});
        const totalDiscount = navigation.getParam('totalDiscount', {});
        const deliveryFee = navigation.getParam('deliveryFee', {});
        const deliveryAddress = navigation.getParam('deliveryAddress', {});
        const containerProps = {
            customCss: `background-color:white;align-items:center;justify-content:center;`,
            keyboardShouldPersistTaps: 'handled'
        };

        const purchaseItemListProps = {
            customCss: `background-color:white;width: ${width};flex-direction:column;padding:5px;`,
            keyboardShouldPersistTaps: 'handled'
        };
        const purchaseItemListItemProps = {
            customCss: `background-color:white;width: ${width};flex-direction:row;padding:10px;align-items:center;`,
            keyboardShouldPersistTaps: 'handled'
        };

        const itemListDiscountPriceProps = {
            customCss: `font-weight:bold;color:black;text-align:center;padding-right: 5px;`
        };

        const itemListPriceTextProps = {
            customCss: `color:gray;text-align:center;padding-left: 5px;font-size:11;text-decoration: line-through;`
        };

        const contentProps = {
            scrollEnabled: true
        };

        const purchaseItemListTitleProps = {
            customCss: `font-size:12;font-weight:bold;text-align:left;width:50%;padding:10px;`
        };

        const purchaseItemListThumbnailProps = {
            customCss: `width:20px;height:20px;`,
            square: true
        };

        const purchaseItemListButtonViewProps = {
            customCss: `flex:1;flex-direction:row;align-items:center;text-align:center;justify-content:center;`
        };

        const purchaseItemListPriceViewProps = {
            customCss: `flex:1;flex-direction:column;align-items:center;justify-content:flex-end;text-align:right;`
        };

        const itemQuantityButtonTextProps = {
            customCss: 'font-weight:bold;font-size:14px;padding:0px;text-align:center;justify-content:center;text-align:center;'
        };

        const itemAmountViewProps = {
            customCss: `flex-direction: row; font-size:11;font-weight:bold;text-align:center;justify-content:space-between;align-items:center;padding:10px;`
        };

        const itemAmountViewLabelProps = {
            customCss: `flex-direction: row; font-size:11;text-align:center;justify-content:space-between;align-items:center;color:gray;font-weight:bold;`
        };

        const itemAmountViewValueProps = {
            customCss: `flex-direction: row; font-size:11;font-weight:normal;text-align:center;justify-content:space-between;align-items:center;font-weight:bold;`
        };

        const itemAmountViewDiscountLabelProps = {
            customCss: `flex-direction: row; font-size:11;text-align:center;justify-content:space-between;align-items:center;color:#32CD32;font-weight:bold;`
        };

        const itemAmountViewDiscountValueProps = {
            customCss: `flex-direction: row; font-size:11;font-weight:normal;text-align:center;justify-content:space-between;align-items:center;font-weight:bold;color:#32CD32`
        };

        const itemAmountViewPayAmountLabelProps = {
            customCss: `flex-direction: row; font-size:14;text-align:center;justify-content:space-between;align-items:center;color:gray;font-weight:bold;`
        };

        const itemAmountViewPayAmountValueProps = {
            customCss: `flex-direction: row; font-size:14;font-weight:normal;text-align:center;justify-content:space-between;align-items:center;font-weight:bold;`
        };

        const itemAmountViewPayAmountProps = {
            customCss: `flex-direction: row; font-size:14;font-weight:bold;text-align:center;justify-content:space-between;align-items:center;padding:10px;`
        };

        const deliveryAddressHeaderViewPayAmountProps = {
            customCss: `flex-direction: row; font-size:11;font-weight:normal;text-align:center;justify-content:space-between;align-items:center;font-weight:bold;padding-left:10px;padding-right:10px;padding-bottom:10px;`
        };

        const deliveryAddressContentViewPayAmountProps = {
            customCss: `width:100%;flex-direction: row; font-size:11;font-weight:normal;text-align:center;justify-content:space-between;align-items:center;font-weight:bold;padding-left:10px;padding-right:10px;margin-bottom:10px;`
        };

        const deliveryAddressContentTextPayAmountProps = {
            customCss: `width:100%;flex-direction: row; font-size:10;font-weight:bold;text-align:left;justify-content:space-between;align-items:center;color:gray;padding:10px;background-color:lightgray;`
        };
        console.log(purchaseItems);
        return (
            <CustomContainer {...containerProps}>
                <CustomContent {...contentProps}>
                    {purchaseItems.length > 0 && <CustomView {...purchaseItemListProps}>
                        {purchaseItems.map((purchaseItem, index) => (
                            <CustomView {...purchaseItemListItemProps} key={index}>
                                <CustomThumbnail {...purchaseItemListThumbnailProps} source={{
                                    uri: purchaseItem.image
                                }} />
                                <CustomText {...purchaseItemListTitleProps}>{purchaseItem.name}</CustomText>
                                <CustomView {...purchaseItemListButtonViewProps}>
                                    <CustomText {...itemQuantityButtonTextProps} >{purchaseItem.quantity}</CustomText>
                                </CustomView>
                                <CustomView {...purchaseItemListPriceViewProps}>
                                    <CustomText {...itemListPriceTextProps}>
                                        ₹{purchaseItem.amount}</CustomText>
                                    <CustomText {...itemListDiscountPriceProps}>
                                        ₹{purchaseItem.amount - purchaseItem.discount_amount}</CustomText>

                                </CustomView>
                            </CustomView>
                        ))}
                    </CustomView>}
                    <CustomScrollView>
                        <CustomView  {...itemAmountViewProps}>
                            <CustomText {...itemAmountViewLabelProps}>
                                Amount</CustomText>
                            <CustomText {...itemAmountViewValueProps}>
                                ₹{totalAmount}</CustomText>
                        </CustomView>
                        <CustomView  {...itemAmountViewProps}>
                            <CustomText {...itemAmountViewDiscountLabelProps}>
                                Discount</CustomText>
                            <CustomText {...itemAmountViewDiscountValueProps}>
                                ₹{totalDiscount}</CustomText>
                        </CustomView>
                        <CustomView  {...itemAmountViewProps}>
                            <CustomText {...itemAmountViewDiscountLabelProps}>
                                Delivery Fee</CustomText>
                            <CustomText {...itemAmountViewDiscountValueProps}>
                                ₹{deliveryFee}</CustomText>
                        </CustomView>
                        <CustomView  {...itemAmountViewPayAmountProps}>
                            <CustomText {...itemAmountViewPayAmountLabelProps}>
                                Amount to pay</CustomText>
                            <CustomText {...itemAmountViewPayAmountValueProps}>
                                ₹{totalAmount - totalDiscount + deliveryFee}</CustomText>
                        </CustomView>
                        <CustomView  {...deliveryAddressHeaderViewPayAmountProps}>
                            <CustomText {...itemAmountViewPayAmountLabelProps}>
                                Delivery Address</CustomText>
                        </CustomView>

                        <CustomView  {...deliveryAddressContentViewPayAmountProps}>
                            <CustomText {...deliveryAddressContentTextPayAmountProps}>
                                {deliveryAddress}</CustomText>
                        </CustomView>
                    </CustomScrollView>
                </CustomContent>
            </CustomContainer>
        );
    }
}



export default SuccessOrder;
