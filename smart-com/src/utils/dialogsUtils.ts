import type { DialogsById, Dialog, MessagesById, Message } from 'types/dialogs';

export const mapDialogsToStoreEntities = (
  dialogsArray: Dialog[]
) => {
  const hasDialogsArrayLength = Boolean(dialogsArray.length);
  const dialogs: DialogsById = {};
  const dialogsIdsSet = new Set<string>();

  if (hasDialogsArrayLength) {
    dialogsArray.forEach((dialog) => {
      const {
        id,
        userName,
        hasNewMessages,
        lastDialogActivityDate,
        lastUserActivityDate,
        newMessagesCount,
        photos: {
          small,
          large
        }
      } = dialog;

      dialogs[id.toString()] = {
        userName,
        hasNewMessages,
        lastDialogActivityDate,
        lastUserActivityDate,
        newMessagesCount,
        photos: {
          small,
          large
        }
      };

      dialogsIdsSet.add(id.toString());
    });
  }

  const dialogsIds = Array.from(dialogsIdsSet);

  return {
    dialogs,
    dialogsIds
  }
};

export const mapMessagesToStoreEntities = (
  dialogsArray: Message[]
) => {
  const hasMessagesArrayLength = Boolean(dialogsArray.length);
  const messages: MessagesById = {};
  const messagesIdsSet = new Set<string>();

  if (hasMessagesArrayLength) {
    dialogsArray.forEach((message) => {
      const {
        addedAt,
        body,
        id,
        recipientId,
        senderId,
        senderName,
        translatedBody,
        viewed
      } = message;

      messages[id.toString()] = {
        addedAt,
        body,
        recipientId,
        senderId,
        senderName,
        translatedBody,
        viewed
      };

      messagesIdsSet.add(id.toString());
    });
  }

  const messagesIds = Array.from(messagesIdsSet);

  return {
    messages,
    messagesIds
  }
};