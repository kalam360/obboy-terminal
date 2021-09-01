import { computed, onMounted, reactive, toRefs } from 'vue';

interface Battery {
  charging: boolean; // Whether the current battery is charging
  chargingTime: number; // How much is the distance from charge, if 0 is charged?
  dischargingTime: number; // Represents how much is the battery is expensive and how to hang up
  level: number; // On behalf of the magnification level, this value is between 0.0 and 1.0
  [key: string]: any;
}

export const useBattery = () => {
  const state = reactive({
    battery: {
      charging: false,
      chargingTime: 0,
      dischargingTime: 0,
      level: 100,
    },
  });

  // Update battery usage
  const updateBattery = (target) => {
    for (const key in state.battery) {
      state.battery[key] = target[key];
    }
    state.battery.level = state.battery.level * 100;
  };

  // Computing battery remaining time
  const calcDischargingTime = computed(() => {
    const hour = state.battery.dischargingTime / 3600;
    const minute = (state.battery.dischargingTime / 60) % 60;
    return `${~~hour}Hour${~~minute}minute`;
  });

  // Computing battery is full of remaining time
  const calcChargingTime = computed(() => {
    console.log(state.battery);
    const hour = state.battery.chargingTime / 3600;
    const minute = (state.battery.chargingTime / 60) % 60;
    return `${~~hour}Hour${~~minute}minute`;
  });

  // Battery status
  const batteryStatus = computed(() => {
    if (state.battery.charging && state.battery.level >= 100) {
      return 'be filled';
    } else if (state.battery.charging) {
      return 'charging';
    } else {
      return 'Disconnected';
    }
  });

  onMounted(async () => {
    const BatteryManager: Battery = await (window.navigator as any).getBattery();
    updateBattery(BatteryManager);

    // The battery is called when the state is updated.
    BatteryManager.onchargingchange = ({ target }) => {
      updateBattery(target);
    };
    // Call when the battery charging time is updated
    BatteryManager.onchargingtimechange = ({ target }) => {
      updateBattery(target);
    };
    // The battery is disconnected when the charge is updated.
    BatteryManager.ondischargingtimechange = ({ target }) => {
      updateBattery(target);
    };
    // Call when the battery is updated
    BatteryManager.onlevelchange = ({ target }) => {
      updateBattery(target);
    };

    // new Intl.DateTimeFormat('zh', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   hour12: false
    // }).format(new Date())
  });

  return {
    ...toRefs(state),
    batteryStatus,
    calcDischargingTime,
    calcChargingTime,
  };
};
