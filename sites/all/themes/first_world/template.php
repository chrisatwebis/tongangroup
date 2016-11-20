<?php

/**
 * @file
 * template.php
 */
/**
 * Implements template_preprocess_entity().
 */
function first_world_preprocess_entity(&$variables, $hook) {
  $function = 'first_world_preprocess_' . $variables['entity_type'];
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}

/**
 * Field Collection-specific implementation of template_preprocess_entity().
 */
function first_world_preprocess_field_collection_item(&$variables) {
  switch ($variables['elements']['#bundle']) {
    case 'field_mini_blocks':
      if (!empty($variables['elements']['#entity']->field_background_color['und'][0]['value'])) {
        $variables['classes_array'][] = $variables['elements']['#entity']->field_background_color['und'][0]['value'];
      }
      break;

    default:
      # code...
      break;
   }
}

function first_world_preprocess_field(&$variables) {
  if ($variables['element']['#field_type'] == 'field_collection') {
    if (!empty($variables['items'])) {
      $item_count = count($variables['items']);
      switch ($variables['element']['#bundle']) {
        case 'mini_blocks_with_icons':
          // switch ($item_count) {
          //   case 1:
          //     foreach ($variables['items'] as $key => &$value) {
          //       $value['#attributes']['class'][] = "col-sm-12";
          //     }
          //     break;
          //   case 2:
          //     foreach ($variables['items'] as $key => &$value) {
          //       $value['#attributes']['class'][] = "col-sm-6";
          //     }
          //     break;
          //   case 3:
          //     foreach ($variables['items'] as $key => &$value) {
          //       $value['#attributes']['class'][] = "col-sm-4";
          //     }
          //     break;
          //   default:
          //     foreach ($variables['items'] as $key => &$value) {
          //       $value['#attributes']['class'][] = "col-sm-4";
          //     }
          //     break;
          // }
          $variables['classes_array'][] = "total_".$item_count;
          break;
        case 'product':
          // switch ($item_count) {
          //   case 1:
          //     foreach ($variables['items'] as $key => &$value) {
          //       $value['#attributes']['class'][] = "col-sm-12";
          //     }
          //     break;
          //   case 2:
          //     foreach ($variables['items'] as $key => &$value) {
          //       $value['#attributes']['class'][] = "col-sm-6";
          //     }
          //     break;
          //   default:
          //     foreach ($variables['items'] as $key => &$value) {
          //       $value['#attributes']['class'][] = "col-sm-6";
          //     }
          //     break;
          // }
          break;
        
        default:
          # code...
          break;
      }

    }
  }
}


function first_world_preprocess_bean(&$variables) {
  $bean_type = $variables['elements']['#bundle'];
  switch ($bean_type) {
    case 'image_block':
      $block_style = $variables['elements']['#entity']->field_image_block_style['und'][0]['value'];
      $variables['classes_array'][] = $block_style;
      break;
    case 'image_block_with_overlay_text':
      $block_style = $variables['elements']['#entity']->field_overlay_style['und'][0]['value'];
      $variables['classes_array'][] = $block_style;
      break;    
    case 'color_block':
      $block_style = "headline_".$variables['elements']['#entity']->field_color_block_headline_style['und'][0]['value'];
      $variables['classes_array'][] = $block_style;
      $block_style = "bg_color_".$variables['elements']['#entity']->field_color_block_bg_color['und'][0]['value'];
      $variables['classes_array'][] = $block_style;
      if (isset($variables['elements']['#entity']->field_description_color['und'])){
        $block_style = "description_color_".$variables['elements']['#entity']->field_description_color['und'][0]['value'];
        $variables['classes_array'][] = $block_style;
      }
      if (isset($variables['elements']['#entity']->field_color_block_cta_link_style['und'])){
        $block_style = "cta_link_style_".$variables['elements']['#entity']->field_color_block_cta_link_style['und'][0]['value'];
        $variables['classes_array'][] = $block_style;
      }
      break;
    case 'mini_blocks_with_icons':
      if (isset($variables['elements']['#entity']->field_mini_blocks_headline_style['und'])){
        $block_style = "headline_".$variables['elements']['#entity']->field_mini_blocks_headline_style['und'][0]['value'];
        $variables['classes_array'][] = $block_style;
      }
      if (isset($variables['elements']['#entity']->field_mini_blocks_bg_color['und'])) {
        $block_style = "bg_color_".$variables['elements']['#entity']->field_mini_blocks_bg_color['und'][0]['value'];
        $variables['classes_array'][] = $block_style;
      }
      
      $block_style = $variables['elements']['#entity']->field_headline_background['und'][0]['value'];
      $variables['classes_array'][] = "headline_bg_".$block_style;
      
      $block_style = $variables['elements']['#entity']->field_mini_blocks_style['und'][0]['value'];
      $variables['classes_array'][] = $block_style;
      
      $block_style = $variables['elements']['#entity']->field_mini_blocks_gutter['und'][0]['value'];
      $variables['classes_array'][] = $block_style;

      if (isset($variables['elements']['#entity']->field_mini_blocks_icon_position['und'])) {
        $block_style = "mini_blocks_style_".$variables['elements']['#entity']->field_mini_blocks_icon_position['und'][0]['value'];
        $variables['classes_array'][] = $block_style;
      }

      $block_style = $variables['elements']['#entity']->field_mini_blocks_icon_size['und'][0]['value'];
      $variables['classes_array'][] = "icon_size_".$block_style;
      //the link style is optional, hence check before apply
      if (!empty($variables['elements']['#entity']->field_mini_blocks_cta_link_style['und'])) {
        $block_style = "cta_link_style_".$variables['elements']['#entity']->field_mini_blocks_cta_link_style['und'][0]['value'];
        $variables['classes_array'][] = $block_style;
      }
      
      break;
    default:
      # code...
      break;
  }
}

/**
 * Implements hook_preprocess_block().
 *
 * Override or insert variables into the block templates.
 */
function first_world_preprocess_block(&$variables) {
  // For bean blocks.
  if ($variables['block']->module == 'bean') {
    // Get the bean elements.
    $beans = $variables['elements']['bean'];
    // There is only 1 bean per block.
    $children = element_children($beans);

    $bean = $beans[reset($children)];

    // Add bean type classes to the parent block.
    $prefix = 'block-bean-' . $bean['#bundle'];
    $variables['classes_array'][] = drupal_html_class($prefix);
    // Add template suggestions for bean types.
    $variables['theme_hook_suggestions'][] = 'block__bean__' . $bean['#bundle'];
  }
  $variables['content_attributes_array']['class'][] = 'block__content';
}

/**
 * Implements hook_preprocess_html().
 */
function first_world_preprocess_html(&$vars) {
  if ($node = menu_get_object()) {
    $node_wrapper = entity_metadata_wrapper('node', $node);

    //If the content type of this node has a field, field_body_classes_select,
    //let's pass the value(s) of the field to the body class in html.tpl.php
    if (isset($node_wrapper->field_body_classes_select)){
      $body_classes = $node_wrapper->field_body_classes_select->value();
      foreach ($body_classes as $body_class) {
        $vars['classes_array'][] = $body_class;
      }
    }

    //If the content type of this node has a field, field_custom_body_classes,
    //let's pass the value(s) of the field to the body class in html.tpl.php
    if (isset($node_wrapper->field_custom_body_classes)){
      $custom_body_classes = $node_wrapper->field_custom_body_classes->value();
      foreach ($custom_body_classes as $custom_body_class) {
        $vars['classes_array'][] = $custom_body_class;
      }
    }
  }
}
