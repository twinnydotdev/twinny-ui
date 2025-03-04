<script lang="ts">
  interface Props {
    buttonText?: string
    disabled?: boolean
    variant?: 'primary' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
    icon?: string
    fullWidth?: boolean
  }

  let props = $props()
  const {
    buttonText = '',
    disabled = false,
    variant = 'primary',
    size = 'md',
    icon = '',
    fullWidth = false
  } = props

  const sizeClasses = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4'
  }

  const baseClasses = `btn-${variant} hover:pointer ${fullWidth ? 'w-full' : ''}`
</script>

<button
  disabled={disabled}
  class={baseClasses}
>
  {#if icon}
    <span class="mr-2">{icon}</span>
  {/if}
  {buttonText}
</button>
