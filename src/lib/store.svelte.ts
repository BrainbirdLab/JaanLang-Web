export const currentPage = ref('/');

function ref<T>(init: T) {
    let value = $state(init);
    return {
        get() {
            return value;
        },
        set(newValue: T) {
            value = newValue;
        }
    };
}