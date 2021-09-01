import { useUserStore } from '@/store/modules/user';

export function usePermission() {
  const userStore = useUserStore();

  /**
   * Check permission
   * @param accesses
   */
  function _somePermissions(accesses: string[]) {
    return userStore.getPermissions.some((item) => {
      const { value }: any = item;
      return accesses.includes(value);
    });
  }

  /**
   * Determine if there is permission
   * can be use on v-if can be use onplay logic
   * */
  function hasPermission(accesses: string[]): boolean {
    if (!accesses || !accesses.length) return true;
    return _somePermissions(accesses);
  }

  /**
   * Whether to include all permissions of the specified
   * @param accesses
   */
  function hasEveryPermission(accesses: string[]): boolean {
    const permissionsList = userStore.getPermissions;
    if (Array.isArray(accesses)) {
      return accesses.every((access) => !!permissionsList[access]);
    }
    throw new Error(`[hasEveryPermission]: ${accesses} should be a array !`);
  }

  /**
   * Whether it contains some permissions
   * @param accesses
   * @param accessMap
   */
  function hasSomePermission(accesses: string[]): boolean {
    const permissionsList = userStore.getPermissions;
    if (Array.isArray(accesses)) {
      return accesses.some((access) => !!permissionsList[access]);
    }
    throw new Error(`[hasSomePermission]: ${accesses} should be a array !`);
  }

  return { hasPermission, hasEveryPermission, hasSomePermission };
}
