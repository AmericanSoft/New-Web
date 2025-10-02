<?php
/**
 * Plugin Name: Kuwait Shipping Fields
 * Description: إضافة المحافظات والمناطق في الكويت مع أسعار شحن مختلفة للـ WooCommerce.
 * Author: Mustafa
 * Version: 1.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// 1) إضافة الحقول
add_filter('woocommerce_checkout_fields', 'kuwait_shipping_fields');
function kuwait_shipping_fields($fields) {
    $fields['shipping']['shipping_governorate'] = array(
        'type'        => 'select',
        'label'       => 'المحافظة',
        'required'    => true,
        'options'     => array(
            ''          => 'اختر المحافظة',
            'capital'   => 'العاصمة',
            'hawalli'   => 'حولي',
            'farwaniya' => 'الفروانية',
            'jahra'     => 'الجهراء',
            'mubarak'   => 'مبارك الكبير',
            'ahmadi'    => 'الأحمدي',
        ),
        'class'       => array('form-row-wide'),
        'priority'    => 20,
    );

    $fields['shipping']['shipping_area'] = array(
        'type'        => 'select',
        'label'       => 'المنطقة',
        'required'    => true,
        'options'     => array(
            '' => 'اختر المحافظة أولاً',
        ),
        'class'       => array('form-row-wide'),
        'priority'    => 21,
    );

    return $fields;
}

// 2) أسعار الشحن
add_action('woocommerce_cart_calculate_fees', 'kuwait_shipping_cost');
function kuwait_shipping_cost($cart) {
    if (is_admin() && !defined('DOING_AJAX')) return;

    $governorate = WC()->session->get('shipping_governorate');
    $area = WC()->session->get('shipping_area');
    $shipping_cost = 0;

    if ($governorate == 'capital') {
        if ($area == 'sharq') $shipping_cost = 2;
        elseif ($area == 'salhiya') $shipping_cost = 2.5;
        elseif ($area == 'qibla') $shipping_cost = 3;
    } elseif ($governorate == 'hawalli') {
        if ($area == 'salmiya') $shipping_cost = 2;
        elseif ($area == 'jabriya') $shipping_cost = 2.5;
        elseif ($area == 'hawalli_city') $shipping_cost = 3;
    } elseif ($governorate == 'farwaniya') {
        if ($area == 'khaitan') $shipping_cost = 2.5;
        elseif ($area == 'ardiya') $shipping_cost = 3;
        elseif ($area == 'farwaniya_city') $shipping_cost = 3.5;
    } elseif ($governorate == 'jahra') {
        if ($area == 'jahra_city') $shipping_cost = 3;
        elseif ($area == 'naseem') $shipping_cost = 3.5;
    } elseif ($governorate == 'mubarak') {
        if ($area == 'alqurain') $shipping_cost = 2.5;
        elseif ($area == 'sabahiya') $shipping_cost = 3;
    } elseif ($governorate == 'ahmadi') {
        if ($area == 'fahaheel') $shipping_cost = 2.5;
        elseif ($area == 'riqqa') $shipping_cost = 3;
        elseif ($area == 'mangaf') $shipping_cost = 3.5;
    }

    if ($shipping_cost > 0) {
        $cart->add_fee('تكلفة الشحن', $shipping_cost);
    }
}

// 3) حفظ البيانات
add_action('woocommerce_checkout_update_order_review', 'kuwait_save_shipping_fields');
function kuwait_save_shipping_fields($post_data) {
    parse_str($post_data, $data);

    if (isset($data['shipping_governorate'])) {
        WC()->session->set('shipping_governorate', sanitize_text_field($data['shipping_governorate']));
    }
    if (isset($data['shipping_area'])) {
        WC()->session->set('shipping_area', sanitize_text_field($data['shipping_area']));
    }
}

// 4) الجافاسكريبت لتغيير المناطق حسب المحافظة
add_action('wp_footer', 'kuwait_dynamic_area_script');
function kuwait_dynamic_area_script() {
    if( is_checkout() ) {
        ?>
        <script>
        jQuery(function($){
            var areas = {
                'capital': {
                    'sharq': 'شرق',
                    'salhiya': 'الصالحية',
                    'qibla': 'قبلة'
                },
                'hawalli': {
                    'salmiya': 'السالمية',
                    'jabriya': 'الجابرية',
                    'hawalli_city': 'حولي'
                },
                'farwaniya': {
                    'khaitan': 'خيطان',
                    'ardiya': 'العارضية',
                    'farwaniya_city': 'الفروانية'
                },
                'jahra': {
                    'jahra_city': 'الجهراء',
                    'naseem': 'النسيم'
                },
                'mubarak': {
                    'alqurain': 'القرين',
                    'sabahiya': 'الصباحية'
                },
                'ahmadi': {
                    'fahaheel': 'الفحيحيل',
                    'riqqa': 'الرقة',
                    'mangaf': 'المنقف'
                }
            };

            $('#shipping_governorate').on('change', function(){
                var gov = $(this).val();
                var $area = $('#shipping_area');
                $area.empty().append('<option value="">اختر المنطقة</option>');
                if(areas[gov]){
                    $.each(areas[gov], function(val, text){
                        $area.append('<option value="'+val+'">'+text+'</option>');
                    });
                }
            });

        });
        </script>
        <?php
    }
}

// إلغاء فورم الفواتير والإبقاء على الشحن فقط
add_filter( 'woocommerce_checkout_fields', function( $fields ) {
    unset( $fields['billing'] ); // يشيل كل حقول الفواتير
    return $fields;
});

// إخفاء عنوان قسم "تفاصيل الفاتورة"
add_filter( 'woocommerce_checkout_fields', function( $fields ) {
    if( isset( $fields['billing'] ) ) {
        unset( $fields['billing'] );
    }
    return $fields;
}, 999 );

// نخلي عنوان الشحن يظهر دايمًا
add_filter( 'woocommerce_cart_needs_shipping_address', '__return_true' );
