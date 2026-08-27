export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Chef Special' | 'Spicy' | 'Signature' | 'Woodfired';

export interface MenuItemOption {
  name: string;
  price: number;
}

export interface MenuItemOptionGroup {
  title: string;
  required?: boolean;
  maxSelect?: number;
  options: MenuItemOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  italianName?: string;
  description: string;
  price: number;
  category: 'starters' | 'pasta' | 'pizza' | 'mains' | 'desserts' | 'drinks' | 'chef-tasting';
  categoryLabel: string;
  image: string;
  tags: DietaryTag[];
  calories?: number;
  prepTimeMinutes?: number;
  spicyLevel?: 0 | 1 | 2 | 3;
  pairingWine?: string;
  allergens?: string[];
  customizationGroups?: MenuItemOptionGroup[];
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: {
    groupTitle: string;
    selectedOption: MenuItemOption;
  }[];
  specialInstructions?: string;
  itemTotal: number;
}

export type OrderFulfillmentType = 'delivery' | 'pickup' | 'dine-in-table';

export type OrderStatus = 'placed' | 'confirmed' | 'in_kitchen' | 'in_oven' | 'out_for_delivery' | 'ready_for_pickup' | 'delivered' | 'completed';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  fulfillmentType: OrderFulfillmentType;
  items: CartItem[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  deliveryFee: number;
  tax: number;
  tip: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    apartment?: string;
    deliveryNotes?: string;
    tableNumber?: string;
  };
  paymentMethod: 'card' | 'apple_pay' | 'cash_on_pickup';
  estimatedMinutes: number;
}

export type SeatingArea = 'main_dining' | 'garden_patio' | 'chef_counter' | 'wine_cellar';

export type ReservationOccasion = 'casual' | 'date_night' | 'birthday' | 'anniversary' | 'business' | 'celebration';

export interface Reservation {
  id: string;
  confirmationCode: string;
  fullName: string;
  email: string;
  phone: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  seatingArea: SeatingArea;
  occasion: ReservationOccasion;
  specialRequests?: string;
  status: 'confirmed' | 'cancelled' | 'seated' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorLocation?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  category: 'Food Quality' | 'Service' | 'Atmosphere' | 'Value' | 'Overall';
  verifiedDiner: boolean;
  recommendedDish?: string;
  helpfulCount: number;
  userVotedHelpful?: boolean;
  avatarUrl?: string;
}

export interface PairingRecommendation {
  courseTitle: string;
  dishName: string;
  dishDescription: string;
  pairedDrink: string;
  pairingNotes: string;
  chefTip: string;
}
