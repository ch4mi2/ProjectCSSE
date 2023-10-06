import { Alert } from 'react-native';

const TwoButtonAlert = (
  title,
  message,
  onPressCancelText,
  onPressConfirmText,
  onPressCancel,
  onPressConfirm
) => {
  Alert.alert(title, message, [
    {
      text: onPressCancelText ?? 'Cancel',
      onPress: onPressCancel() ?? (() => {}),
      style: 'cancel',
    },
    {
      text: onPressConfirmText ?? 'Confirm',
      onPress: onPressConfirm() ?? (() => {}),
    },
  ]);
};

export default TwoButtonAlert;
