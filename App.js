import React, {useEffect} from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'expo-status-bar';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform, TextInput,
    BackHandler,
} from 'react-native';

import {CheckBox} from 'react-native-elements';

const Tab = createBottomTabNavigator();


export default function App() {

    const [isHomeShown, setIsHomeShown] = React.useState(true)
    const [isCartShown, setIsCartShown] = React.useState(false)
    const [isCommandDone, setIsCommandDone] = React.useState(false)
    const [cart, setCart] = React.useState([])
    const [selectedRune, setSelectedRune] = React.useState()

    useEffect(() => {
        const backAction = () => {
            if (selectedRune) {
                setSelectedRune(null);
                return true; // This will prevent the app from exiting
            }
            return false; // This will cause the app to exit
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, [selectedRune]);

    var greatRunes = [
        {
            name: "Malenia",
            description:
                "Attacks dealt after taking damage recover HP.",
            imageUrl:
                "https://www.gamerguides.com/assets/media/14/1505/malenias_great_rune.png",
            fullImg:
                "https://www.gamerguides.com/assets/media/14/1488/malenia_blade_of_miquella.png",
            fullDesc:
                "A Great Rune of the shardbearer Malenia. The blessing of this half-rotted rune reduces the healing power of Flask of Crimson Tears. And yet, due to the infusion of Malenia’s spirit of resistance. attacks made immediately after receiving damage will partially recover HP. Malenia is daughter to Queen Marika and Radagon, and her Great Rune should have been the most sacred of all.",
            price: 5000,
        },
        {
            name: "Godrick",
            description:
                "Raises all attributes.",
            fullDesc:
                "A Great Rune of the shardbearer Godrick. Its blessing raises all attributes This Great Rune is known as the anchor ring, found in the center of the Elden Ring. The first demigods were The Elden Lord Godfrey and his offspring, the golden lineage.",
            fullImg:
                "https://www.gamerguides.com/assets/media/14/259/godrick.png",
            imageUrl:
                "https://www.gamerguides.com/assets/media/14/1058/godricks_great_rune.png",
            price: 1000,
        },
        {
            name: "Morgott",
            description:
                "Raises maximum HP.",
            fullImg:
                "https://www.gamerguides.com/assets/media/14/307/morgott_the_omen_king.png",
            imageUrl:
                "https://www.gamerguides.com/assets/media/14/1059/morgotts_great_rune.png",
            fullDesc:
                "A Great Rune of the shardbearer Morgott. Its blessing greatly raises maximum HP. This Great Rune is the anchor ring that houses the base, and proves two things: That the Omen King was born of the golden lineage, and that he was indeed the Lord of Leyndell.",
            price: 3000,
        },
        {
            name: "Radahn",
            description: "Raises maximum HP, FP and Stamina.",
            fullImg:
                "https://www.gamerguides.com/assets/media/14/291/starscourge_radahn.png",
            imageUrl:
                "https://www.gamerguides.com/assets/media/14/1061/radahns_great_rune3.png",
            fullDesc:
                "A Great Rune of the shardbearer Radahn. Its blessing raises maximum HP, FP and Stamina. Radahn was amongst the children of Rennala and Radagon, who became demigod stepchildren after Radagon’s union with Queen Marika. The Great Rune burns, to resist the encroachment of the scarlet rot.",
            price: 4000,
        },
        {
            name: "Mohg",
            description:
                "Grants a blessing of blood to phantoms.",
            fullImg:
                "https://www.gamerguides.com/assets/media/14/2263/mohg_lord_of_blood2.png",
            imageUrl:
                "https://www.gamerguides.com/assets/media/14/1506/mohgs_great_rune2.png",
            fullDesc:
                "A Great Rune of the shardbearer Mohg. Its blessing grants a blessing of blood to summoned phantoms, and imparts a Phantom Great Rune upon successful invasion. Mohg and Morgott are twin brothers, and their Great Runes are naturally similar. But Mohg’s rune is soaked in accursed blood, from his devout love for the wretched mire that he was born into far below the earth.",
            price: 3000,
        },
    ]

    const [checkboxStates, setCheckboxStates] = React.useState(Array(greatRunes.length).fill(false));
    const [deliveryAddress, setDeliveryAddress] = React.useState('');

    const removeFromCart = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
    };
    const onDonePress = () => {
        setIsCommandDone(false);
        setIsHomeShown(true);
    };

    if (isCommandDone) {
        return (
            <View style={{backgroundColor: '#D8D2B0', flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <View style={{...styles.menu, position: 'absolute', top: 0}}>
                    <Text style={{fontWeight: 'bold'}}>
                        DeliveRing
                    </Text>
                </View>

                <Image
                    style={{resizeMode: 'contain', width: '50%', height: '50%'}}
                    source={require('./resources/ER_golden_order.png')}
                />

                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
                    Votre commande est passée avec succès !
                </Text>
                <Text style={{fontSize: 20, marginBottom: 20}}>
                    Elle sera livrée au {deliveryAddress}
                </Text>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: '#B07943',
                        borderRadius: 5,
                    }}
                    onPress={onDonePress}
                >
                    <Text style={{fontSize: 16, color: 'white'}}>Retour à l'accueil</Text>
                </TouchableOpacity>
            </View>
        );
    } else if (isCartShown) {
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#D8D2B0',
                }}>
                <StatusBar hidden={true}/>
                <View style={styles.menu}>
                    <Text style={{fontWeight: 'bold'}}>
                        DeliveRing
                    </Text>
                    <TouchableOpacity
                        style={styles.retourMenu}
                        onPress={() => {
                            setIsCartShown(false)
                            setIsHomeShown(true)
                        }}>
                        <Text style={{
                            fontSize: 15,
                            margin: 5,
                            color: 'white',
                        }}>Retour</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>

                    {cart.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                margin: 10,
                                padding: 15,
                                borderColor: "lightgray",
                                borderRadius: 5,
                                flexDirection: "column",
                                elevation: 5,
                            }}
                        >
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <Image
                                    style={{width: 100, height: 100}}
                                    source={{uri: item.imageUrl}}
                                />
                                <View style={{
                                    flexDirection: "column",
                                    width: '33%',
                                    alignItems: 'left',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{marginBottom: 5, fontWeight: 'bold'}}>{item.name}</Text>
                                    <Text style={{marginBottom: 5}}>{item.description}</Text>
                                    <Text>Prix: {item.price} âmes</Text>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#B07943',
                                        // padding: 10,
                                        height: 25,
                                        width: 25,
                                        borderRadius: 5,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => removeFromCart(index)}>
                                    <Text style={{color: 'white'}}>x</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <Text style={{margin: 10}}>Total: {totalPrice} âmes</Text>
                    <View style={{padding: 20}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                            Adresse de livraison :
                        </Text>
                        <TextInput
                            style={{
                                borderBottomWidth: 1,
                                borderColor: 'gray',
                                padding: 10,
                                marginBottom: 20,
                            }}
                            placeholder="Saisissez votre adresse"
                            value={deliveryAddress}
                            onChangeText={(text) => setDeliveryAddress(text)}
                        />
                    </View>
                    <View style={{height: 100}}/>
                </ScrollView>
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => {
                        setIsCartShown(false);
                        setIsCommandDone(true);
                        setCart([])
                    }}
                >
                    <Text style={styles.buttonText}>Passer la commande</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const addToCart = () => {
        const itemsToAdd = greatRunes.filter((_, index) => checkboxStates[index]);
        setCart([...cart, ...itemsToAdd]);
        // Réinitialisez les états des cases à cocher une fois ajoutés au panier si nécessaire
        setCheckboxStates(Array(greatRunes.length).fill(false));
    };

    if (selectedRune) {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>

                <View style={styles.menu}>
                    <Text style={{fontWeight: 'bold'}}>
                        DeliveRing
                    </Text>
                    <TouchableOpacity style={{
                        flex: 1,
                        alignItems: 'flex-end',
                    }}
                                      onPress={() => {
                                          setIsCartShown(true)
                                      }}
                    >
                        <Text>🛒 {cart && cart.length}</Text>
                    </TouchableOpacity>

                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <Image
                        style={{width: '100%', height: 350}}
                        source={{uri: selectedRune.fullImg,}}
                    />
                    <View style={{alignItems: 'center', margin: 10}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>{selectedRune.name}</Text>
                        <Text style={{fontSize: 15}}>{selectedRune.description}</Text>
                        <Text style={{
                            margin: 10,
                            padding: 10,
                            borderWidth: 1,
                            backgroundColor: "lightgray",
                            fontSize: 18,
                            fontStyle: "italic"
                        }}>
                            {selectedRune.fullDesc}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{...styles.retourArticle, backgroundColor: '#B07943'}}
                        onPress={() => {
                            setCart([...cart, selectedRune])
                            setSelectedRune(null)
                        }}
                    >
                        <Text style={{fontSize: 15, margin: 5, color: 'white'}}>Ajouter sa rune au panier</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.retourArticle}
                        onPress={() => {
                            setSelectedRune(null)
                        }}
                    >
                        <Text style={{fontSize: 15, margin: 5, color: 'white'}}>Retour</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else if (isHomeShown) {
        const isBoxChecked = checkboxStates.some((isChecked) => isChecked);
        return (

            <View style={styles.container}>
                <StatusBar hidden={true}/>

                <View style={styles.menu}>
                    <Text style={{fontWeight: 'bold'}}>
                        DeliveRing
                    </Text>
                    <TouchableOpacity style={{
                        flex: 1,
                        alignItems: 'flex-end',
                    }}
                                      onPress={() => {
                                          setIsCartShown(true)
                                      }}
                    >
                        <Text>🛒 {cart && cart.length}</Text>
                    </TouchableOpacity>

                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}//showsVerticalScrollIndicator={false}
                >
                    {greatRunes.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setSelectedRune(item)
                                const updatedCheckboxStates = [...checkboxStates];
                                updatedCheckboxStates[index] = !updatedCheckboxStates[index];
                            }}
                        >
                            <View style={styles.itemContainer}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={{
                                            borderRadius: 10,
                                            width: 150,
                                            height: 150
                                        }}
                                        source={{
                                            uri: item.imageUrl,
                                        }}
                                    />
                                </View>
                                <View style={styles.textAndCheckbox}>
                                    <View style={styles.textNoCheckbox}>

                                        <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                                        <Text style={{ fontSize: 13 }}>{item.description}</Text>
                                    </View>
                                </View>
                                <View style={styles.checkbox}>
                                    <CheckBox
                                        checked={checkboxStates[index]}
                                        onPress={() => {
                                            const updatedCheckboxStates = [...checkboxStates];
                                            updatedCheckboxStates[index] = !updatedCheckboxStates[index];
                                            setCheckboxStates(updatedCheckboxStates);
                                        }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>

                    ))}
                    <View style={{height: 100}}/>

                </ScrollView>
                {/* Floating button */}
                {isBoxChecked && (
                    <TouchableOpacity style={styles.floatingButton} onPress={addToCart}>
                        <Text style={styles.buttonText}>Ajouter au panier</Text>
                    </TouchableOpacity>)
                }
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8D2B0',
        alignItems: 'center',
    },
    scrollContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Espacement entre les éléments
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 100,
        width: '100%',
    },
    itemContainer: {
        backgroundColor: '#D8D2B0',
        width: 190, // Permet d'afficher deux éléments par ligne avec un espace entre eux
        marginBottom: 10, // Espace vertical entre les éléments
        elevation: 8,
        borderColor: 'gray',
        borderRadius: 5,
        minHeight: 275,
    },
    menu: {
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        backgroundColor: '#F2D06C',
        alignItems: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 2,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    retourMenu: {
        backgroundColor: "#466748",
        borderRadius: 5,
        padding: 5,
        position: 'absolute',
        right: 10,
    },
    retourArticle: {
        margin: 5,
        padding: 5,
        backgroundColor: "#466748",
        borderRadius: 5,
    },
    imageContainer: {},
    textAndCheckbox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: 10,
        width: "70%",
    },
    textNoCheckbox: {
        flexDirection: "column",
    },
    checkbox: {
        position: "absolute",
        right: 0,
        bottom: 20,
    },
    floatingButton: {
        position: 'absolute',
        bottom: '2%',  // Adjust the distance from the bottom as needed
        right: '5%',   // Adjust the distance from the right as needed
        backgroundColor: '#B07943',
        borderRadius: 5, // Makes it round
        width: '90%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});
