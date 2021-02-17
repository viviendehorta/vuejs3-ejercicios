import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
describe('App.vue', () => {
  it('should paint an empty list of todos', () => {
    const wrapper = shallowMount(App, {
      data() {
        return {
          todos: []
        };
      }
    });
    expect(wrapper.findAll('[data-test="todo"')).toHaveLength(0);
  });
  it('should paint a list of todos', () => {
    const wrapper = shallowMount(App, {
      data() {
        return {
          todos: [
            {
              checked: false,
              text: 'todo 1'
            },
            {
              checked: false,
              text: 'todo 2'
            }
          ]
        };
      }
    });
    expect(wrapper.findAll('[data-test="todo"')).toHaveLength(2);
  });
});
