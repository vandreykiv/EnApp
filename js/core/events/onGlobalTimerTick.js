import PushNotification from 'react-native-push-notification';
import gameStore from '../stores/gameStore';
import globals from '../../constants/globals';
import Helper from '../../util/helper';

export default () => {
    const { gameModel } = gameStore;
    const Level = gameModel.Level;

    gameStore.globalTimerCounter += 1;

    if (gameModel.Event === 0) {
        PushNotification.localNotification({
            id: '0',
            title: `${Level.Number}/${gameModel.Levels.length}${Level.Name ? `: ${Level.Name}` : ''}`,
            message: [
                `${Level.Timeout > 0 ? `АП: ${Helper.formatCount(Level.TimeoutSecondsRemain - gameStore.globalTimerCounter)}` : ''}`,
                `Осталось: ${Level.SectorsLeftToClose > 0 ? Level.SectorsLeftToClose : 1}`,
            ].join('   '),
            ongoing: true,
            autoCancel: false,
            vibrate: false,
            playSound: false,
        });
    }

    if (globals.REFRESH_INTERVAL_SECONDS > 0 && gameStore.globalTimerCounter % globals.REFRESH_INTERVAL_SECONDS === 0) {
        gameStore.updateGameModel();
    }
};
