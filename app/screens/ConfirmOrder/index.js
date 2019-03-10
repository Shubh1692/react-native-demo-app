import React, { Component } from 'react';
import { Dimensions, Alert } from 'react-native';
import { CustomView, CustomImage, CustomContainer, CustomContent, CustomThumbnail, CustomFooter, CustomText, CustomButton, CustomScrollView } from '../../components/CustomStyledComponent';

const findTotal = (purchaseItems) => {
    const totalAmount = purchaseItems.length > 0 ? purchaseItems.reduce((a, b) => (a + b.amount), 0) : 0;
    const totalDiscount = purchaseItems.length > 0 ? purchaseItems.reduce((a, b) => (a + b.discount_amount), 0) : 0;
    return {
        totalAmount,
        totalDiscount
    }
}

const { width } = Dimensions.get('window');
class ConfirmOrder extends Component {
    static propTypes = {

    };
    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state = {
            purchaseItems: [],
            amount: 0,
            discount: 0,
            deliveryFee: 0,
            deliveryAddress: '37 Govind nagar Charan nadi 2nd, Nadi ka phatak, Jaipur, Rajasthan',
            items: [{
                image: 'https://www.bigbasket.com/media/uploads/p/l/30011828_4-bikaji-namkeen-bikaneri-bhujia.jpg',
                name: 'Bikaji Bikaneri Bhujiya 1kg',
                actual_price: 220,
                discount: 65
            }, {
                image: 'https://www.bigbasket.com/media/uploads/p/l/70000791_1-haldirams-namkeen-navrattan-del.jpg',
                name: 'Haldiram Namkeen 1kg',
                actual_price: 220,
                discount: 55
            }, {
                image: 'http://paulwriter.com/wp-content/uploads/2014/08/Parle-Products-Aloo-Laccha-Piri-Piri-Flavour.jpg',
                name: 'Parle Namkeen 1kg',
                actual_price: 220,
                discount: 75
            }, {
                image: 'http://www.sme.in/shankarfood/images/Rajshri-Potato-Fariyali-Namkeen-Fariyali.jpg',
                name: 'Raj shree nakeen 1kg',
                actual_price: 220,
                discount: 15
            }, {
                image: 'https://cavinkare.com/img/2017/03/Paper-Banana-Chips-130.png',
                name: 'Garden Chips 1kg',
                actual_price: 220,
                discount: 30
            }, {
                image: 'https://assetscdn1.paytm.com/images/catalog/product/F/FA/FASPRAKASH-NAMKRSR-884864E1D3283A/a_0..jpg?imwidth=282&impolicy=hq',
                name: 'Prakash Long Sev 1kg',
                actual_price: 220,
                discount: 40
            }, {
                image: 'https://cdn.shopify.com/s/files/1/1910/2649/products/namkeen-channa-dal-30-gm_480x480.jpg?v=1534586593',
                name: 'Patanjali Chana Dal 1kg',
                actual_price: 399,
                discount: 99
            }, {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1MzDOkBCYUF5kzBOKD1OQD8s7N3YZ1aywhQdNsvx_CJdJiebJ',
                name: 'Miraj Sev 1kg',
                actual_price: 599,
                discount: 155
            }],
            totalAmount: 0,
            totalDiscount: 0
        };
    }

    onQuantityAdd(purchaseItemIndex) {
        let purchaseItems = this.state.purchaseItems.slice(0);
        purchaseItems[purchaseItemIndex].quantity++;
        purchaseItems[purchaseItemIndex].amount = Number(parseFloat(purchaseItems[purchaseItemIndex].quantity * purchaseItems[purchaseItemIndex].actual_price).toFixed(2));
        purchaseItems[purchaseItemIndex].discount_amount = Number(parseFloat(purchaseItems[purchaseItemIndex].quantity * purchaseItems[purchaseItemIndex].discount).toFixed(2));

        this.setState({
            purchaseItems, ...findTotal(purchaseItems)
        })
    }

    onQuantitySubtract(purchaseItemIndex) {
        let purchaseItems = this.state.purchaseItems.slice(0);
        let items = this.state.items.slice(0);
        purchaseItems[purchaseItemIndex].quantity--;
        if (purchaseItems[purchaseItemIndex].quantity) {
            purchaseItems[purchaseItemIndex].amount = Number(parseFloat(purchaseItems[purchaseItemIndex].quantity * purchaseItems[purchaseItemIndex].actual_price).toFixed(2));
            purchaseItems[purchaseItemIndex].discount_amount = Number(parseFloat(purchaseItems[purchaseItemIndex].quantity * purchaseItems[purchaseItemIndex].discount).toFixed(2));
        } else {
            items[purchaseItems[purchaseItemIndex].itemIndex].hide = false;
            purchaseItems.splice(purchaseItemIndex, 1);
        }
        this.setState({
            purchaseItems, ...findTotal(purchaseItems),
            items
        })
    }

    onItemSelect(itemIndex) {
        let items = this.state.items.slice(0);
        let purchaseItems = this.state.purchaseItems.slice(0);
        purchaseItems.push({
            ...items[itemIndex], ... {
                amount: items[itemIndex].actual_price,
                discount_amount: items[itemIndex].discount,
                quantity: 1,
                itemIndex
            }
        });
        items[itemIndex].hide = true;
        this.setState({
            items,
            purchaseItems, ...findTotal(purchaseItems)
        })
    }

    confirmOrder() {
        Alert.alert(
            'Confirm Order',
            'Are you sure want to confirm order',
            [
                {
                    text: 'Cancel',
                    onPress: () => {

                    },
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => {
                        const { navigation = {} } = this.props;
                        const { navigate } = navigation;
                        const { purchaseItems, totalAmount, totalDiscount, deliveryAddress, deliveryFee } = this.state;

                        navigate('SuccessOrder', {
                            purchaseItems,
                            totalAmount,
                            totalDiscount,
                            deliveryFee, 
                            deliveryAddress
                        })
                    }
                },
            ],
            { cancelable: false },
        );
    }





    render() {
        const { items, purchaseItems, totalAmount, totalDiscount, deliveryFee, deliveryAddress } = this.state;
        
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

        const itemListProps = {
            customCss: `flex:1;flex-direction:column;justify-content:center;padding:10px;text-align:center;height:200px;`,
            keyboardShouldPersistTaps: 'handled'
        };

        const itemViewProps = {
            customCss: `background-color:lightgray;`
        };

        const itemListScrollProps = {
            customCss: `width: ${width};flex:1;flex-direction:row;`,
            keyboardShouldPersistTaps: 'handled',
            horizontal: true
        };

        const itemListTitleProps = {
            customCss: `font-size:12;font-weight:bold;text-align:center;`
        };

        const imageProps = {
            customCss: `flex-direction: row; flex-wrap: wrap;height:100px;width:100px;resize-mode: cover;align-self:stretch;justify-content:center;margin:auto;`,
            stretch: true
        };

        const itemImageViewProps = {
            customCss: `padding:0px;border:2px solid gray;width:100%;`
        };

        const itemContentViewProps = {
            customCss: `flex-direction: column;height:20%;width:100px;`
        };

        const itemListNoteProps = {
            customCss: `padding:10px 10px 10px 10px;font-size:14;font-weight:300;`
        };

        const itemSubContentViewProps = {
            customCss: `flex-direction: row; font-size:12;font-weight:normal;text-align:center;justify-content:center;align-items:center;`
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
            customCss: `font-size:12;font-weight:bold;text-align:left;width:30%;padding:10px;`
        };

        const itemAddButtonProps = {
            small: true,
            success: true,
            customCss: 'position:absolute;right:0px;top:0px;font-weight:normal;padding:0px;margin:0px;'
        };

        const itemAddButtonTextProps = {
            customCss: 'font-weight:bold;font-size:10px;padding:5px;margin:0px;text-align:center;'
        };

        const purchaseItemListThumbnailProps = {
            customCss: `width:20px;height:20px;`,
            square: true
        };

        const purchaseItemListButtonViewProps = {
            customCss: `flex:1;flex-direction:row;border:2px solid gray;align-items:center;text-center;justify-content:space-between;margin-left:10px;margin-right:10px;`
        };

        const itemQuantityButtonProps = {
            transparent: true,
            small: true,
            success: true,
            customCss: 'padding-left:0;justify-content:center;align-items:center;font-weight:bold;font-size:14px;'
        };

        const purchaseItemListPriceViewProps = {
            customCss: `flex:1;flex-direction:column;align-items:center;justify-content:flex-end;text-align:right;`
        };

        const itemQuantityButtonTextProps = {
            customCss: 'font-weight:bold;font-size:14px;padding:0px;text-align:center;padding-left:10px;padding-right:10px;'
        };

        const itemEmptyTextProps = {
            customCss: 'margin:10px;padding:10px;width:100%;font-weight:bold;font-size:14px;padding:0px;text-align:center;'
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
            customCss: `flex-direction: row; font-size:11;font-weight:normal;text-align:center;justify-content:space-between;align-items:center;font-weight:bold;padding-left:10px;padding-right:10px;`
        };

        const deliveryAddressButtonProps = {
            customCss: `flex-direction: row; font-size:14;font-weight:bold;text-align:center;justify-content:space-between;align-items:center;`,
            transparent: true,
        };

        const deliveryAddressButtonLabelProps = {
            customCss: `flex-direction: row; font-size:10;font-weight:bold;text-align:center;justify-content:space-between;align-items:center;color:gray;padding:0;`,
        }

        const deliveryAddressContentViewPayAmountProps = {
            customCss: `width:100%;flex-direction: row; font-size:11;font-weight:normal;text-align:center;justify-content:space-between;align-items:center;font-weight:bold;padding-left:10px;padding-right:10px;margin-bottom:10px;`
        };

        const deliveryAddressContentTextPayAmountProps = {
            customCss: `width:100%;flex-direction: row; font-size:10;font-weight:bold;text-align:left;justify-content:space-between;align-items:center;color:gray;padding:10px;background-color:lightgray;`
        };

        const footerViewProps = {
            customCss: `flex-direction: column; font-size:11;font-weight:normal;text-align:center;justify-content:space-between;align-items:center;font-weight:bold;width:100%;background-color:white;`
        };
        const paymentInfoTextProps = {
            customCss: `flex-direction: row; font-size:10;font-weight:bold;text-align:center;justify-content:center;align-items:center;color:gray;padding:0;`,
        };

        const confirmOrderButtonProps = {
            customCss: `flex-direction: row; font-size:10;font-weight:bold;text-align:center;justify-content:center;align-items:center;color:gray;padding:0;width:100%`,
            success: true,
            disabled: !totalAmount
        };
        return (
            <CustomContainer {...containerProps}>
                <CustomContent {...contentProps}>
                    {purchaseItems.length === 0 && <CustomText {...itemEmptyTextProps}>
                        Please add some item of create order</CustomText>}
                    {purchaseItems.length > 0 && <CustomView {...purchaseItemListProps}>
                        {purchaseItems.map((purchaseItem, index) => (
                            <CustomView {...purchaseItemListItemProps} key={index}>
                                <CustomThumbnail  {...purchaseItemListThumbnailProps} source={{
                                    uri: purchaseItem.image
                                }} />
                                <CustomText {...purchaseItemListTitleProps}>{purchaseItem.name}</CustomText>
                                <CustomView {...purchaseItemListButtonViewProps}>
                                    <CustomButton {...itemQuantityButtonProps} onPress={() => this.onQuantitySubtract(index)}>
                                        <CustomText {...itemQuantityButtonTextProps}>-</CustomText>
                                    </CustomButton>
                                    <CustomText {...itemQuantityButtonTextProps} >{purchaseItem.quantity}</CustomText>
                                    <CustomButton {...itemQuantityButtonProps} onPress={() => this.onQuantityAdd(index)}>
                                        <CustomText {...itemQuantityButtonTextProps}>+</CustomText>
                                    </CustomButton>
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
                    <CustomScrollView {...itemViewProps}>
                        <CustomText {...itemListNoteProps}>You may also add:</CustomText>
                        <CustomScrollView {...itemListScrollProps}>
                            {items.map((item, index) => (
                                !item.hide ? <CustomView {...itemListProps} key={index}>
                                    <CustomView {...itemImageViewProps}>
                                        <CustomImage {...imageProps} source={{ uri: item.image }} >
                                        </CustomImage>
                                        <CustomButton {...itemAddButtonProps} onPress={() => this.onItemSelect(index)}>
                                            <CustomText {...itemAddButtonTextProps}>+ Add</CustomText>
                                        </CustomButton>
                                    </CustomView>
                                    <CustomView {...itemContentViewProps}>
                                        <CustomText {...itemListTitleProps} >{item.name}</CustomText>
                                        <CustomView {...itemSubContentViewProps}>
                                            <CustomText {...itemListDiscountPriceProps}>
                                                ₹{item.actual_price - item.discount}</CustomText>
                                            <CustomText {...itemListPriceTextProps}>
                                                ₹{item.actual_price}</CustomText>
                                        </CustomView>
                                    </CustomView>
                                </CustomView> : <CustomView key={index}></CustomView>
                            ))}

                        </CustomScrollView>
                        {items.findIndex((item) => !item.hide) === -1 && <CustomText {...itemEmptyTextProps}>
                            You don't have item for add</CustomText>}
                    </CustomScrollView>
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
                            {deliveryFee === 0 ? <CustomText {...itemAmountViewDiscountValueProps}>
                                Always Free</CustomText> : <CustomText {...itemAmountViewDiscountValueProps}>
                                    ₹{deliveryFee}</CustomText>}
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
                            <CustomButton {...deliveryAddressButtonProps} onPress={() => { }}>
                                <CustomText {...deliveryAddressButtonLabelProps}>
                                    Change Address</CustomText>
                            </CustomButton>
                        </CustomView>

                        <CustomView  {...deliveryAddressContentViewPayAmountProps}>
                            <CustomText {...deliveryAddressContentTextPayAmountProps}>
                                {deliveryAddress}</CustomText>
                        </CustomView>
                    </CustomScrollView>
                </CustomContent>
                <CustomFooter {...footerViewProps}>
                    <CustomText {...paymentInfoTextProps}>
                        Payment by cash on delivery</CustomText>
                    <CustomButton {...confirmOrderButtonProps} onPress={() => this.confirmOrder()}>
                        <CustomText>Confirm Order</CustomText>
                    </CustomButton>
                </CustomFooter>
            </CustomContainer>
        );
    }
}



export default ConfirmOrder;
