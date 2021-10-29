import React, {Component} from 'react' ;
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Header, AirbnbRating, Icon}from 'react-native-elements'
import {RFValue} from 'react-native-fontsize'
import axios from 'axios'

export default class HomeScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            movieDetails :{}

        }
    }
    timeconvert(n){
    var hrs = Math.floor(n/60);
    var mins = num%60;
    return `${hrs}hrs ${mins}mins`
}
componentDidMount(){this.getmovie()}
getmovie = ()=>{ 
    const url = 'http://localhost:19002/get-movie'
    axios.get(url).then(response=>{
        let details = response.data.data
        details ['duration'] = this.timeconvert(details.duration)
        this.setState({movieDetails:details})
    })
.catch(e=>{
    console.log(e.message)

})
}
likedmovie = ()=>{ 
    const url = 'http://localhost:5000/liked-movie'
    axios.post(url).then(response=>{
    this.getmovie()
    })
.catch(e=>{
    console.log(e.message)

})
}
dislikedmovie = ()=>{ 
    const url = 'http://localhost:5000/disliked-movie'
    axios.post(url).then(response=>{
    this.getmovie()
    })
.catch(e=>{
    console.log(e.message)

})
}
notwatchmovie = ()=>{ 
    const url = 'http://localhost:5000/notwactch-movie'
    axios.post(url).then(response=>{
    this.getmovie()
    })
.catch(e=>{
    console.log(e.message)

})
}

render(){
    const {movieDetails}= this.state;
    if (movieDetails.poster_link){
        const {
            poster_link, title, release_date, overview, duration, rating
        } = movieDetails;
        return(
            <View style = {styles.container}>
                <View style = {styles.headercontainer}>
                    <Header centerComponent = {{text:'movie recommendation', style:styles.headertitle}}
                    rightComponent = {{icon:'search',color : 'orange'}}
                    backgroundcolor = {'black'} containerStyle = {{flex:1}}/>
                </View>
               <View style = {styles.subcontainer}> 
               <Image style = {styles.posterimage} source = {{uri:poster_link}}></Image></View>
                <View style = {styles = subbottomcontainer}>
                    <View style = {styles.topcontainer}></View>
                    <Text style = {styles.title}>{title}</Text>
                    <Text style = {styles.subtitle}>{`${release_date.split('-')[0]}| ${duration}`}</Text>
                </View>
                <View style = {style.subbottomcontainer}>
                    <View style = {{flex:0.3}}>
                        <AirbnbRating count = {10}
                        reviews = {['','','','','']}
                        defualtRating = {rating}
                        isDisabled = {true}
                        size = {RFValue(25)}
                        starContainerStyle = {{marginTop : -20}}
                        />
                    </View>
                    <View style = {{flex:0.7, padding : 15}}>
                        <Text style={styles.overview}>{overview}</Text>
                    </View>
                    <View style = {styles.iconbuttoncontainer}>
                        <TouchableOpacity onPress = {this.likedmovie}>
                            <Icon reverse name = {'check'} type = {'entypo'} size = {RFValue(30)} color = {'black'}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this.dislikedmovie}>
                            <Icon reverse name = {'cross'} type = {'entypo'} size = {RFValue(30)} color = {'red'}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this.notwatchmovie}>
                            <Text style = {styles.buttontext}>didnotwatch</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
                </View>
        )
    }
}

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    headercontainer:{
        flex:0.1,
    },
    headertitle:{
        color:"purple",
        fontWeight: 'bold',
        fontSize: RFValue(18)
    },
    posterimage:{
        width:'60%',
        height:'90%',
        resizeMode:'stretch',
        borderRadius: RFValue(30),
        marginHorizontal: RFValue(10),
    },
    overview:{
        fontSize:RFValue(13),
        textAlign:'center',
        fontWeight:'bold',
        color:'red'
    },
    iconbuttoncontainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    button:{
        width:RFValue(160),
        height: RFValue(50),
        borderRadius:RFValue(20),
        justifyContent:'center',
        alignItems:'center',
        borderWidth1:1,
        marginTop:RFValue(15)
    },
    buttontext:{
        fontSize:RFValue(15),
        fontWeight:'bold',
    }
    

})


