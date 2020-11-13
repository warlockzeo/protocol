<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitf78775b9e49a5f67f47863c3cdc44c45
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitf78775b9e49a5f67f47863c3cdc44c45::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitf78775b9e49a5f67f47863c3cdc44c45::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}