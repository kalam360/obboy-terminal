import { ref, onMounted, onUnmounted } from 'vue';

/**
 * @description Whether the user network is available
 * */
export function useOnline() {
  const online = ref(true);

  const showStatus = (val) => {
    online.value = typeof val == 'boolean' ? val : val.target.online;
  };

  // Set the correct network status after the page is loaded
  navigator.onLine ? showStatus(true) : showStatus(false);

  onMounted(() => {
    // Start listening to changes in network status
    window.addEventListener('online', showStatus);

    window.addEventListener('offline', showStatus);
  });
  onUnmounted(() => {
    // Remove changes in listening network status
    window.removeEventListener('online', showStatus);

    window.removeEventListener('offline', showStatus);
  });

  return { online };
}
