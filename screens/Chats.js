import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Avatar, GiftedChat } from 'react-native-gifted-chat'
import { firebaseApp } from '../config/firebase'
import { 
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import colors from '../colors'

const firestore = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export default function Chat() {
  const [messages, setMessages] = useState([])
  const navigation = useNavigation()

  const onSignOut = () => {
    signOut(auth)
      .catch(err => console.log(err))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          style={{ marginRight: 16 }}
          onPress={onSignOut}>
          <AntDesign name='logout' size={24} color={colors.gray} style={{ marginRight: 16 }} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  useLayoutEffect(() => {
    const collectionRef = collection(firestore, 'chats')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsuscribe = onSnapshot(q, snapshot => {
      console.log('snapshot')
      setMessages(
        snapshot.docs.map(doc => ({ 
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    })
    return () => unsuscribe()
  }, [])

  const onSend = useCallback(messages => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const { _id, createdAt, text, user } = messages[0]
    addDoc(collection(firestore, 'chats'), { _id, createdAt, text, user })
  }, [])

  return (
    <GiftedChat 
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{ 
        _id: auth.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300'
      }}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      showAvatarForEveryMessage={true}
      showUserAvatar={true}
    />
  )
}