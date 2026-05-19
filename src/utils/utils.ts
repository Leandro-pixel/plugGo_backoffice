import NotificationPopUp from 'src/components/popup/NotificationPopUp.vue';
import Hashids from 'hashids';
import { Dialog, Loading, Notify, QSpinnerBall } from 'quasar';
import ConfirmPopUp from 'src/components/popup/ConfirmPopUp.vue';
import CopyPopUp from 'src/components/popup/CopyPopUp.vue';
import PopUp from 'src/components/popup/PopUp.vue';

const implementHierarchy = (necessaryPermission: string): boolean => {
  switch (necessaryPermission) {
    case 'sysAdmin':
      return ['support'].includes(atob(localStorage.getItem('userType') || ''));
    case 'admin':
      return ['support', 'admin'].includes(
        atob(localStorage.getItem('userType') || '')
      );
    case 'polo':
      return ['support', 'admin', 'polo',].includes(
        atob(localStorage.getItem('userType') || '')
      );
      case 'representative':
      return ['support', 'admin', 'polo','representative'].includes(
        atob(localStorage.getItem('userType') || '')
      );
    case 'store':
      return ['support', 'admin', 'polo', 'representative','establishmentOwner'].includes(
        atob(localStorage.getItem('userType') || '')
      );
      case 'justEC':
      return ['establishmentOwner'].includes(
        atob(localStorage.getItem('userType') || '')
      );
    case 'seller':
      return [
        'support',
        'admin',
        'polo',
        'representative',
        'establishmentOwner',
        'seller',
      ].includes(atob(localStorage.getItem('userType') || ''));
    default:
      return false;
  }
};

class NotifyError {
  static success = (message: string): void => {
    Notify.create({
      message,
      color: 'positive',
      classes: 'text-h5',
    });
  };

  static error = (message: string): void => {
    Notify.create({
      message,
      color: 'negative',
      classes: 'text-h5',
    });
  };

  static warning = (message: string): void => {
    Notify.create({
      message,
      color: 'warning',
      classes: 'text-h5',
    });
  };

  static info = (message: string): void => {
    Notify.create({
      message,
      color: 'info',
      classes: 'text-h5',
    });
  };
}

class ShowLoading {
  static show = (message: string): void => {
    Loading.show({
      spinner: QSpinnerBall,
      spinnerColor: 'secondary',
      spinnerSize: 140,
      message,
      customClass: 'text-h5',
    });
  };

  static hide = (message?: string): void => {
    this.show(message || '');
    setTimeout(() => {
      Loading.hide();
    }, 1000);
  };
}

class ShowDialog {
  static show = (
    title: string,
    description: string,
    iconName = 'error'
  ): void => {
    Dialog.create({
      component: PopUp,

      componentProps: {
        title,
        description,
        iconName,
      },
    });
  };

  static showNotification = (
    title: string,
    message: string,
    color?: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      Dialog.create({
        component: NotificationPopUp,

        componentProps: {
          title,
          message,
          color,
        },
      })
        .onOk(() => {
          resolve(true);
        })
    });
  };

  static showConfirm = (
    title: string,
    message: string,
    color?: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      Dialog.create({
        component: ConfirmPopUp,

        componentProps: {
          title,
          message,
          color,
        },
      })
        .onOk(() => {
          resolve(true);
        })
        .onCancel(() => {
          resolve(false);
        });
    });
  };

  static showCopyToClipboard = (
    title: string,
    description: string,
    stringToCopy: string,
    redirectTo?: string
  ): void => {
    Dialog.create({
      component: CopyPopUp,

      componentProps: {
        title,
        description,
        stringToCopy,
        redirectTo,
      },
    });
  };

}

class HashIds {
  //hashids para codificar e decodificar números (ou IDs) em strings curtas
  public static hash = new Hashids('', 20);
  static encryptId = (value: string): string =>
    this.hash.encode(parseInt(value, 20));
  static decryptId = (value: string): string =>
    this.hash.decode(value)[0].toString(20);
}
export {
  implementHierarchy,
  NotifyError,
  ShowLoading,
  ShowDialog,
  HashIds,
};

//export { implementHierarchy, NotifyError, ShowLoading, ShowDialog, HashIds }
