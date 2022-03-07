import { StatusLoadingWs } from 'types/utility';

export type ChatMessageAPIType = {
  message: string
  photo: string
  userId: number
  userName: string
};

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusLoadingWs) => void;

interface Subcribers {
  'messages-received': MessagesReceivedSubscriberType[];
  'status-changed': StatusChangedSubscriberType[]
};

const subcribers: Subcribers = {
  'messages-received': [],
  'status-changed': []
};

let ws: WebSocket | null = null;
type EventsNamesType = 'messages-received' | 'status-changed';

const closeHandler = () => {
  notifySubscribersAboutStatus(StatusLoadingWs.PENDING)
  setTimeout(createChannel, 3000)
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subcribers['messages-received'].forEach(s => s(newMessages))
};

const openHandler = () => {
  notifySubscribersAboutStatus(StatusLoadingWs.READY)
};

const errorHandler = () => {
  notifySubscribersAboutStatus(StatusLoadingWs.ERROR)
  console.error('REFRESH PAGE')
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
};

const notifySubscribersAboutStatus = (status: StatusLoadingWs) => {
  subcribers['status-changed'].forEach(s => s(status))
};

function createChannel() {
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscribersAboutStatus(StatusLoadingWs.PENDING)
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
};

export const chatAPI = {
  start() {
    createChannel()
  },

  stop() {
    subcribers['messages-received'] = []
    subcribers['status-changed'] = []
    cleanUp()
    ws?.close()
  },

  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subcribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subcribers[eventName] = subcribers[eventName].filter(subcriber => (
        subcriber !== callback));
    };
  },

  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    // @ts-ignore
    subcribers[eventName] = subcribers[eventName].filter(subcriber => (
      subcriber !== callback));
  },

  sendMessage(message: string) {
    ws?.send(message)
  }
};